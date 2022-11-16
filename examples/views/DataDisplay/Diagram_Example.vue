/**
* @描述: Diagram_Example例子
* @作者: 张俊
* @创建时间: 2022-06-01 15:57:26
*/
<template>
  <diagram :dataSource="data"
           style="margin: auto;background: #8799a3;"
           :width="390"
           :height="data.nodes.length*120"></diagram>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Diagram from '../../../packages/DataDisplay/Diagram/Diagram.vue';

@Component({
  name: 'DiagramExample',
  components: { Diagram },
})
export default class DiagramExample extends Vue {
  data = {
    nodes: [
      {
        id: '157a340c120511ed96db37c0a86c327b',
        shape: 'custom-node',
        data: {
          id: '157a340c120511ed96db37c0a86c327b',
          name: '延续',
          state: null,
          outsideLabel: '2020年04月30日',
          extraData: {
            mc: '云南新平金辉矿业发展有限公司米底莫铜铁矿',
            tags: [
              '矿业权更新',
            ],
            fwzb: '1,6,1,2668244.94,34461476.02,2,2668244.94,34462324.04,3,2667352.94,34462321.04,4,2667405.94,34461976.03,5,2667346.94,34461900.02,6,2667331.94,34461474.01,1250,500,,1,',
          },
        },
        x: 60,
        y: 50,
        _order: 0,
      },
      {
        id: '1579e5ea120511ed96db37c0a86c327b',
        shape: 'custom-node',
        data: {
          id: '1579e5ea120511ed96db37c0a86c327b',
          name: '延续',
          state: null,
          outsideLabel: '2018年05月07日',
          extraData: {
            mc: '云南新平金辉矿业发展有限公司米底莫铜铁矿',
            tags: [
              '矿业权更新',
            ],
            fwzb: '1,6,1,2668238.95,34461365.35,2,2668238.95,34462213.35,3,2667346.95,34462210.35,4,2667399.95,34461865.35,5,2667340.95,34461789.34,6,2667325.95,34461363.34,1250,500,,1,',
          },
        },
        x: 60,
        y: 180,
        _order: 0,
      },
      {
        id: '158928ae120511ed96db37c0a86c327b',
        shape: 'custom-node',
        data: {
          id: '158928ae120511ed96db37c0a86c327b',
          name: '变更',
          state: null,
          outsideLabel: '2016年04月22日',
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
        shape: 'custom-node',
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
        shape: 'custom-node',
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
        shape: 'yellow-edge',
        labels: [],
        source: '1579e5ea120511ed96db37c0a86c327b',
        target: '157a340c120511ed96db37c0a86c327b',
      },
      {
        shape: 'yellow-edge',
        labels: [],
        source: '158928ae120511ed96db37c0a86c327b',
        target: '1579e5ea120511ed96db37c0a86c327b',
      },
      {
        shape: 'yellow-edge',
        labels: [
          {
            attrs: {
              label: {
                text: '出让收益',
                id: '009aae244f9211ed8e8a4f1622525d33',
                type: 2,
                lx: 2,
                date: '1970-01-01 08:00:00',
              },
              body: {
                fill: '#64C8F0',
              },
            },
            position: {
              distance: 0.3333333333,
              options: {
                absoluteDistance: true,
              },
            },
          },
          {
            attrs: {
              label: {
                text: '资源储量核实报告',
                id: 'a383e2090e1311ed8dd99fe874afb66a',
                type: 1,
                lx: 996008,
                date: '2016-01-01 08:00:00',
              },
              body: {
                fill: '#FAAA1E',
              },
            },
            position: {
              distance: 0.6666666666,
              options: {
                absoluteDistance: true,
              },
            },
          },
        ],
        source: '0',
        target: '158928ae120511ed96db37c0a86c327b',
      },
    ],
  }
}
</script>

<style scoped lang="less">

</style>
