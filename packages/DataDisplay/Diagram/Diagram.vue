/**
* @描述: Diagram（基于AntV X6）
* @作者: 张俊
* @创建时间: 2022-06-01 15:51:02
*/
<template>
  <div ref="mountNode" style="width: 100%;height: 100%;" v-bind="$attrs"></div>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { Graph } from '@antv/x6';
import '@antv/x6-vue-shape';
import { DagreLayout } from '@antv/layout';
import CustomNode from './CustomNode.vue';

export interface DiagramData {
  nodes: any[];
  edges: any[];
}

@Component({
  name: 'Diagram',
})
export default class Diagram extends Vue {
  @Prop({
    type: Object,
    default: () => ({}),
  }) dataSource: DiagramData | undefined;

  // 图的布局类型
  @Prop({
    type: String,
    default: 'dagre',
  }) type: string | undefined;

  @Prop({
    type: String,
    default: 'transparent',
  }) backgroundColor: string | undefined;

  @Prop({
    type: Number || String,
    default: undefined,
  }) width: number | string | undefined;

  @Prop({
    type: Number || String,
    default: undefined,
  }) height: number | string | undefined;

  graph: any;

  get getStyle() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  // 注册所有的自定义node
  registerNodes() {
    try {
      Graph.registerNode('custom-node', {
        inherit: 'vue-shape',
        width: 50,
        height: 50,
        component: {
          template: '<custom-node/>',
          components: { CustomNode },
        },
      });
    } catch (e) {
      // console.error('AntV x6自定义node报错：', e);
    }
  }

  // 注册所有的自定义edge
  registerEdges() {
    try {
      Graph.registerEdge(
        'yellow-edge', // 边名称
        {
          // 基类
          inherit: 'edge',
          // 属性样式
          attrs: {
            line: {
              stroke: '#BFCB5B',
            },
          },
          // 默认标签
          // 默认标签
          defaultLabel: {
            markup: [
              {
                tagName: 'circle',
                selector: 'body',
              },
              {
                tagName: 'text',
                selector: 'label',
              },
            ],
            attrs: {
              label: {
                event: 'edge:click', // 点击边的时候触发
                xlinkType: 'a',
                fill: '#fff',
                fontSize: 12,
                textAnchor: 'Start',
                textVerticalAnchor: 'middle',
                refX: '100%',
                refX2: 20,
              },
              body: {
                ref: 'label',
                fill: this.backgroundColor,
                // stroke: '#BFCB5B',
                // strokeWidth: 1,
                refR: '50%', // 半径
                refCx: 0,
                refCy: 0,
              },
            },
            position: {
              distance: 0.5, // 中间位置
              options: {
                absoluteDistance: true,
              },
            },
          },
        },
      );
    } catch (e) {
      // console.error('AntV x6自定义edge报错：', e);
    }
  }

  // 初始化
  initGraph(data = this.dataSource) {
    debugger;
    const { mountNode }: any = this.$refs;
    const width = mountNode.scrollWidth;
    const height = mountNode.scrollHeight;
    const options: any = {
      container: mountNode,
      width: this.width || width,
      height: this.height || height,
      autoResize: false, // 是否监听容器大小改变，并自动更新画布大小。
      panning: false, // 画布是否可以拖动
      background: {
        color: this.backgroundColor, // 设置画布背景颜色
      },
      scroller: false,
      // translating: { // 限制子节点的移动
      //   restrict(view) {
      //     const { cell } = view;
      //     if (cell.isNode()) {
      //       const parent = cell.getParent();
      //       if (parent) {
      //         return parent.getBBox();
      //       }
      //     }
      //
      //     return null;
      //   },
      // },
    };
    this.graph = new Graph(options);

    // 初始化node的事件
    this.graph.on('node:click', (params) => {
      const {
        e,
        x,
        y,
        node,
        view,
      } = params;
      e.stopPropagation();
      debugger;
      console.log('node:click事件：', params);
      const { state, name } = params;
      // 如果不显示节点就不要点击事件
      if (name || state) {
        this.emitNodeClick(params);
      }
    });

    // 初始化edges的事件
    this.graph.on('edge:click', (params) => {
      const { e } = params;
      e.stopPropagation();
      debugger;
      console.log('edge:click事件：', params);
      this.emitEdgeClick(params);
    });

    if (data) {
      this.updateData(data);
    }
  }

  // 添加/更新数据
  updateData(data = this.dataSource) {
    const dagreLayout = new DagreLayout({
      type: 'dagre', // 流程图
      rankdir: 'BT',
      align: undefined, // undefined：默认，中间对齐。'UR'：对齐到右上角；'UL'：对齐到左上角；'DL'：对齐到左下角；'DR'：对齐到右下角；
      ranksep: 30, // 在 rankdir 为 TB 或 BT 时是竖直方向相邻层间距
      nodesep: 0, // 在 rankdir 为 TB 或 BT 时是节点的水平间距
      controlPoints: false,
    });

    const newModel = dagreLayout.layout(data);

    this.graph.fromJSON(newModel);
    // 这个居中操作必须在更新数据后调用，否则不起作用
    this.graph.centerContent();

    // const ids = this.graph.model.getCellById('test');

    // const parent = this.graph.addNode({
    //   width: 150,
    //   height: 600,
    //   zIndex: -1,
    //   label: '保山怒江金矿',
    //   children: ['b83f3407fc2544a797b882f878ff8f6f', 'f88bdc435b984ac6882158fe16642782'],
    //   attrs: {
    //     label: { refY: this.graph.options.height, refY2: -250, fill: '#fff' },
    //     body: {
    //       stroke: 'red',
    //       fill: 'transparent',
    //     },
    //   },
    // });

    // const target = this.graph.addNode({
    //   width: 80,
    //   height: 40,
    //   label: 'Child\n(target)',
    //   attrs: {
    //     body: {
    //       stroke: 'none',
    //       fill: '#47C769',
    //     },
    //     label: {
    //       fill: '#fff',
    //     },
    //   },
    // });

    // parent.setChildren([target], { silent: true });
  }

  mounted() {
    this.registerNodes();
    this.registerEdges();
    this.$nextTick(() => {
      this.initGraph();
    });
  }

  // 监听数据源
  @Watch('dataSource', { deep: true })
  handleDataSourceChange(newVal, oldVal) {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal) && this.graph) {
      this.updateData(newVal);
    }
  }

  // 节点的点击事件
  @Emit('nodeClick')
  emitNodeClick(e) {
    return e;
  }

  // 边的点击事件
  @Emit('edgeClick')
  emitEdgeClick(e) {
    return e;
  }
}
</script>

<style lang="less">
.v-line {
  cursor: pointer;
  fill-opacity: 0.7;

  &:hover {
    fill-opacity: 1;
  }
}
</style>
