/**
* @描述: Diagram_Example例子
* @作者: 张俊
* @创建时间: 2022-06-01 15:57:26
*/
<template>
  <relation-diagram :dataSource="data"
                    style="margin: auto;background: rgba(248,248,248,0.66)"
                    :width="390"
                    @checked="onChecked"
                    @nodeClick="onNodeClick"
                    :height="data.nodes.length*150"></relation-diagram>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RelationDiagram from '../../../packages/DataDisplay/RelationDiagram/RelationDiagram.vue';

@Component({
  name: 'RelationDiagramExample',
  components: { RelationDiagram },
})
export default class RelationDiagramExample extends Vue {
  data = {
    nodes: [
      {
        id: '157a340c120511ed96db37c0a86c327b',
        shape: 'custom-node-relation',
        data: {
          id: '157a340c120511ed96db37c0a86c327b',
          name: '延续',
          state: null,
          content: 'C5300002008124120001574',
          color: '#00A0A0',
        },
        x: 60,
        y: 50,
        _order: 0,
      },
      {
        id: '1579e5ea120511ed96db37c0a86c327b',
        shape: 'custom-node-relation',
        data: {
          id: '1579e5ea120511ed96db37c0a86c327b',
          name: '延续',
          state: null,
          content: 'C5300002008124120001574',
        },
        x: 60,
        y: 180,
        _order: 0,
      },
      {
        id: '158928ae120511ed96db37c0a86c327b',
        shape: 'custom-node-relation',
        data: {
          id: '158928ae120511ed96db37c0a86c327b',
          name: '变更',
          state: null,
          outsideLabel: '2016年04月22日',
          content: 'C5300002008124120001574',
          extraData: {
            mc: '云南新平金辉矿业发展有限公司米底莫铜铁矿',
            tags: [
              '矿业权更新',
            ],
            fwzb: '1,6,1,2668238.95,34461365.35,2,2668238.95,34462213.35,3,2667346.95,34462210.35,4,2667399.95,34461865.35,5,2667340.95,34461789.34,6,2667325.95,34461363.34,1250,500,,1,',
          },
        },
        x: 60,
        y: 310,
        _order: 0,
      },
      {
        id: '1',
        shape: 'custom-node-relation',
        data: {
          id: '1',
          name: null,
          state: null,
          outsideLabel: null,
          extraData: null,
        },
        x: 20,
        y: 440,
        _order: 0,
      },
      {
        id: '0',
        shape: 'custom-node-relation',
        data: {
          id: '0',
          name: null,
          state: null,
          outsideLabel: null,
          extraData: null,
        },
        x: 60,
        y: 440,
        _order: 1,
      },
    ],
    edges: [
      {
        source: '1579e5ea120511ed96db37c0a86c327b',
        target: '157a340c120511ed96db37c0a86c327b',
        attrs: {
          line: {
            stroke: '#A2B1C3',
            strokeWidth: 2,
            strokeDasharray: 5,
            targetMarker: null,
          },
        },
      },
      {
        source: '158928ae120511ed96db37c0a86c327b',
        target: '1579e5ea120511ed96db37c0a86c327b',
        attrs: {
          line: {
            stroke: '#A2B1C3',
            strokeWidth: 2,
            targetMarker: null,
          },
        },
      },
      {
        source: '0',
        target: '158928ae120511ed96db37c0a86c327b',
        attrs: {
          line: {
            stroke: 'red',
            strokeWidth: 2,
            strokeDasharray: 5,
            targetMarker: null,
          },
        },
      },
    ],
  }

  onChecked(e) {
    console.log('onChecked事件：', e);
  }

  onNodeClick(e) {
    console.log('onNodeClick事件：', e);
  }
}
</script>

<style scoped lang="less">

</style>
