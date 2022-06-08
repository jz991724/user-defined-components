/**
* @描述: Diagram（基于AntV X6）
* @作者: 张俊
* @创建时间: 2022-06-01 15:51:02
*/
<template>
  <div ref="mountNode" style="width: 100%;height: 100%;"></div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { Graph } from '@antv/x6';
import '@antv/x6-vue-shape';
import { DagreLayout } from '@antv/layout';
import CustomNode from './CustomNode.vue';

export interface DiagramData {
  nodes: any[],
  edges: any[]
}

@Component({
  name: 'Diagram',
})
export default class Diagram extends Vue {
  @Prop({ type: Object, default: () => ({}) }) dataSource: DiagramData | undefined;

  // 图的布局类型
  @Prop({ type: String, default: 'dagre' }) type: string | undefined

  @Prop({ type: String, default: '#029C9C' }) backgroundColor: string | undefined

  graph;

  // 注册所有的自定义node
  registerNodes() {
    Graph.registerNode('custom-node', {
      inherit: 'vue-shape',
      width: 50,
      height: 35,
      component: {
        template: '<custom-node/>',
        components: { CustomNode },
      },
    });
  }

  // 注册所有的自定义edge
  registerEdges() {
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
        defaultLabel: {
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            label: {
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              pointerEvents: 'none',
            },
            body: {
              ref: 'label',
              fill: this.backgroundColor,
              stroke: '#BFCB5B',
              strokeWidth: 2,
              rx: 4,
              ry: 4,
              refWidth: '140%',
              refHeight: '140%',
              refX: '-20%',
              refY: '-20%',
            },
          },
          position: {
            distance: 100, // 绝对定位
            options: {
              absoluteDistance: true,
            },
          },
        },
      },
    );
  }

  // 初始化
  initGraph(data = this.dataSource) {
    const { mountNode }: any = this.$refs;
    const width = mountNode.scrollWidth;
    const height = mountNode.scrollHeight || 500;

    this.graph = new Graph({
      container: mountNode,
      width,
      height,
      autoResize: true, // 是否监听容器大小改变，并自动更新画布大小。
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
    });

    // 初始化node的事件
    this.graph.on('node:click', ({
                                   e, x, y, node, view,
                                 }) => {
      e.stopPropagation();
      console.log('nodeData:', node.getData());
    });

    this.updateData(data);
  }

  // 添加/更新数据
  updateData(data = this.dataSource) {
    const dagreLayout = new DagreLayout({
      type: 'dagre', // 流程图
      rankdir: 'BT',
      align: 'UR',
      ranksep: 30,
      nodesep: 50,
      controlPoints: false,
    });

    const newModel = dagreLayout.layout(data);

    this.graph.fromJSON(newModel);
    // 这个居中操作必须在更新数据后调用，否则不起作用
    this.graph.centerContent();

    // const ids = this.graph.model.getCellById('test');
    debugger;

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
    this.initGraph();
  }

  // 监听数据源
  @Watch('dataSource', { deep: true })
  handleDataSourceChange(newVal, oldVal) {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal) && this.graph) {
      this.updateData(newVal);
    }
  }
}
</script>

<style scoped lang="less">

</style>
