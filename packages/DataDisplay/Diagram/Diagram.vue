/**
* @描述: Diagram（基于AntV G6）
* @作者: 张俊
* @创建时间: 2022-06-01 15:51:02
*/
<template>
  <div ref="mountNode" style="height: 100%;width: 100%"></div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import G6 from '@antv/g6';
import insertCss from 'insert-css';
import * as stream from 'stream';

export interface DiagramData {
  nodes: any[],
  edges: any[]
}

@Component({ name: 'Diagram' })
export default class Diagram extends Vue {
  @Prop({ type: Object, default: () => ({}) }) dataSource: DiagramData | undefined;

  // 图的布局类型
  @Prop({ type: String, default: 'dagre' }) type: string | undefined

  graphG6;

  // 初始化
  initGraphG6(data = this.dataSource) {
    const mountNode: any = this.$el;
    const width = mountNode.scrollWidth;
    const height = mountNode.scrollHeight || 500;

    G6.registerNode(
      'sql',
      {
        drawShape(cfg: any, group) {
          const rect = group.addShape('rect', {
            attrs: {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 10,
              stroke: '#5B8FF9',
              fill: '#C6E5FF',
              lineWidth: 3,
            },
            name: 'rect-shape',
          });
          if (cfg.name) {
            group.addShape('text', {
              attrs: {
                text: cfg.name,
                x: 0,
                y: 0,
                fill: '#00287E',
                fontSize: 14,
                textAlign: 'center',
                textBaseline: 'middle',
                fontWeight: 'bold',
              },
              name: 'text-shape',
            });
          }
          return rect;
        },
      },
      'single-node',
    );

    this.graphG6 = new G6.Graph({
      container: mountNode, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width, // Number，必须，图的宽度
      height, // Number，必须，图的高度
      fitView: true, // 是否开启画布自适应。开启后图自动适配画布大小
      layout: {
        type: this.type, // dagre：层次布局；
        nodesepFunc: (d) => {
          if (d.id === '3') {
            return 500;
          }
          return 50;
        },
        ranksep: 70,
        controlPoints: true,
        rankdir: 'BT',
      },
      defaultNode: {
        type: 'sql',
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5',
        },
      },
      nodeStateStyles: {
        selected: {
          stroke: '#d9d9d9',
          fill: '#5394ef',
        },
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          {
            type: 'tooltip',
            formatText(model) {
              const cfg = model.conf;
              const text = [];
              cfg.forEach((row: any) => {
                text.push(`${row.label}:${row.value}<br>`);
              });
              return text.join('\n');
            },
            offset: 30,
          },
        ],
      },
    });

    this.graphG6.data(data);
    this.graphG6.render();
  }

  // 设置样式
  initGraphCss() {
    // 我们用 insert-css 演示引入自定义样式
    // 推荐将样式添加到自己的样式文件中
    // 若拷贝官方代码，别忘了 npm install insert-css
    insertCss(`
    .g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
  }`);
  }

  created() {
    this.initGraphCss();
  }

  mounted() {
    this.initGraphG6();

    if (typeof window !== 'undefined') {
      window.onresize = () => {
        if (!this.graphG6 || this.graphG6.get('destroyed')) {
          return;
        }
        this.graphG6.changeSize(this.$el.scrollWidth, this.$el.scrollHeight);
      };
    }
  }

  // 监听数据源
  @Watch('dataSource', { deep: true })
  handleDataSourceChange(newVal, oldVal) {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      this.initGraphG6();
    }
  }
}
</script>

<style scoped lang="less">

</style>
