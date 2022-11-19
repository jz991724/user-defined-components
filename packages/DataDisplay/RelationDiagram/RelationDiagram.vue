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
import CustomNodeRelation from './CustomNodeRelation.vue';

export interface DiagramData {
  nodes: any[];
  edges: any[];
}

@Component({
  name: 'RelationDiagram',
})
export default class RelationDiagram extends Vue {
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
      Graph.registerNode('custom-node-relation', {
        inherit: 'vue-shape',
        width: 175,
        height: 65,
        component: {
          template: '<custom-node-relation/>',
          components: { CustomNodeRelation },
        },
        // 属性样式
        event: 'node:checked',
      });
    } catch (e) {
      // console.error('AntV x6自定义node报错：', e);
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
      // 节点数据
      const nodeData = params?.cell?.data || {};
      // 点击的是多选框
      if (e.target.classList.contains('ant-checkbox-input')) {
        this.emitNodeChecked(!e.target.checked, nodeData);
      } else { // 点击的是节点
        this.emitNodeClick(nodeData);
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
    console.log('diagram数据：', data);

    const dagreLayout = new DagreLayout({
      type: 'dagre', // 流程图
      rankdir: 'BT',
      align: undefined, // undefined：默认，中间对齐。'UR'：对齐到右上角；'UL'：对齐到左上角；'DL'：对齐到左下角；'DR'：对齐到右下角；
      ranksep: 50, // 在 rankdir 为 TB 或 BT 时是竖直方向相邻层间距
      nodesep: 0, // 在 rankdir 为 TB 或 BT 时是节点的水平间距
      controlPoints: false,
    });

    const newModel = dagreLayout.layout(data);

    this.graph.fromJSON(newModel);
    // 这个居中操作必须在更新数据后调用，否则不起作用
    this.graph.centerContent();
  }

  mounted() {
    this.registerNodes();
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

  @Emit('checked')
  emitNodeChecked(checked, params) {
    return { checked, params };
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
