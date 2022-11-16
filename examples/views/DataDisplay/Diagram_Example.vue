/**
* @描述: Diagram_Example例子
* @作者: 张俊
* @创建时间: 2022-06-01 15:57:26
*/
<template>
  <diagram :dataSource="data"></diagram>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Diagram from '../../../packages/DataDisplay/Diagram/Diagram.vue';

@Component({
  name: 'DiagramExample',
  components: { Diagram },
})
export default class DiagramExample extends Vue {
  // data: any = {
  //   // 节点
  //   nodes: [
  //     {
  //       id: 'node2', // String，可选，节点的唯一标识
  //       shape: 'custom-node',
  //       data: {
  //         name: '测试',
  //         state: 'danger',
  //         tags: ['小朋友', '二条街'],
  //         outsideLabel: '测试11acsdcsddcsdcsd',
  //       },
  //     },
  //     {
  //       id: 'node3', // String，可选，节点的唯一标识
  //       shape: 'custom-node',
  //       label: 'hello', // String，节点标签
  //       data: {
  //         name: '测试',
  //         state: '',
  //       },
  //     },
  //     {
  //       id: 'node4', // String，节点的唯一标识
  //       width: 80, // Number，可选，节点大小的 width 值
  //       height: 40, // Number，可选，节点大小的 height 值
  //       label: 'world', // String，节点标签
  //     },
  //   ],
  //   // 边
  //   edges: [
  //     {
  //       shape: 'yellow-edge',
  //       labels: ['边label'],
  //       source: 'node2', // String，必须，起始节点 id
  //       target: 'node3', // String，必须，目标节点 id
  //     },
  //     {
  //       source: 'node2', // String，必须，起始节点 id
  //       target: 'node4', // String，必须，目标节点 id
  //     },
  //   ],
  // };

  // data = {
  //   nodes: [
  //     {
  //       id: 'edb94526d5d34c2dacde56c692ac5048',
  //       shape: 'custom-node',
  //       data: {
  //         id: 'edb94526d5d34c2dacde56c692ac5048',
  //         name: '2022',
  //         mc: 'aaaa',
  //         state: 'danger',
  //         tags: [
  //           '出让收益',
  //         ],
  //         outsideLabel: '注销',
  //       },
  //     },
  //     {
  //       id: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
  //       shape: 'custom-node',
  //       data: {
  //         id: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
  //         name: '2022',
  //         mc: 'aaaa',
  //         state: null,
  //         tags: [
  //           '矿业权更新',
  //         ],
  //         outsideLabel: '变更',
  //       },
  //     },
  //     {
  //       id: '7067103e01794a419334690f10c6293c',
  //       shape: 'custom-node',
  //       data: {
  //         id: '7067103e01794a419334690f10c6293c',
  //         name: '2022',
  //         extraData: {
  //           mc: 'aaaa',
  //         },
  //         state: null,
  //         tags: [
  //           '矿业权更新',
  //         ],
  //         outsideLabel: '变更',
  //       },
  //     },
  //     {
  //       id: 'b83f3407fc2544a797b882f878ff8f6f',
  //       shape: 'custom-node',
  //       data: {
  //         id: 'b83f3407fc2544a797b882f878ff8f6f',
  //         name: '2022',
  //         mc: 'aaaa',
  //         state: null,
  //         tags: [
  //           '矿业权更新',
  //         ],
  //         outsideLabel: '新立',
  //       },
  //     },
  //     {
  //       id: 'f88bdc435b984ac6882158fe16642782',
  //       shape: 'custom-node',
  //       data: {
  //         id: 'f88bdc435b984ac6882158fe16642782',
  //         name: '2022',
  //         mc: 'aaaa',
  //         state: null,
  //         tags: [
  //           '矿业权更新',
  //         ],
  //         outsideLabel: '变更',
  //       },
  //     },
  //     // {
  //     //   id: 'test',
  //     //   zIndex: -1,
  //     //   label: '保山怒江金矿',
  //     //   attrs: {
  //     //     label: { fill: '#fff' },
  //     //     body: {
  //     //       stroke: 'red',
  //     //       fill: 'transparent',
  //     //     },
  //     //   },
  //     //   children:
  //     //     ['edb94526d5d34c2dacde56c692ac5048', 'f88bdc435b984ac6882158fe16642782', '4f46d95ac7c44b9a9668ffb6e5e8d30f', 'b83f3407fc2544a797b882f878ff8f6f'],
  //     // },
  //     // {
  //     //   id: 'test1',
  //     //   zIndex: -1,
  //     //   label: '保山怒江金矿1',
  //     //   attrs: {
  //     //     label: { fill: '#fff' },
  //     //     body: {
  //     //       stroke: 'red',
  //     //       fill: 'transparent',
  //     //     },
  //     //   },
  //     //   children: ['7067103e01794a419334690f10c6293c'],
  //     // },
  //   ],
  //   edges: [
  //     {
  //       shape: 'yellow-edge',
  //       labels: null,
  //       source: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
  //       target: '7067103e01794a419334690f10c6293c',
  //     },
  //     {
  //       shape: 'yellow-edge',
  //       labels: null,
  //       source: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
  //       target: 'f88bdc435b984ac6882158fe16642782',
  //     },
  //     {
  //       shape: 'yellow-edge',
  //       labels: null,
  //       source: '7067103e01794a419334690f10c6293c',
  //       target: 'edb94526d5d34c2dacde56c692ac5048',
  //     },
  //     {
  //       shape: 'yellow-edge',
  //       labels: null,
  //       source: 'b83f3407fc2544a797b882f878ff8f6f',
  //       target: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
  //     },
  //     {
  //       shape: 'yellow-edge',
  //       labels: null,
  //       source: 'f88bdc435b984ac6882158fe16642782',
  //       target: 'edb94526d5d34c2dacde56c692ac5048',
  //     },
  //   ],
  // }

  data = {
    nodes: [
      {
        id: 'edb94526d5d34c2dacde56c692ac5047',
        shape: 'custom-node',
        data: {
          id: 'edb94526d5d34c2dacde56c692ac5047',
          extraData: {
            mc: 'aaaa',
            fwzb: '1,4,1,3020203.90,34590379.50,2,3020048.40,34592233.00,3,3019150.20,34592304.60,4,3018953.60,34590359.60,2800,1860,,1,',
          },
        },
      },
      {
        id: 'edb94526d5d34c2dacde56c692ac5048',
        shape: 'custom-node',
        data: {
          id: 'edb94526d5d34c2dacde56c692ac5048',
          name: '2022',
          state: 'danger',
          tags: [
            '出让收益',
          ],
          outsideLabel: '注销',
          extraData: {
            mc: 'aaaa',
            fwzb: '1,4,1,3020203.90,34590379.50,2,3020048.40,34592233.00,3,3019150.20,34592304.60,4,3018953.60,34590359.60,2800,1860,,1,',
          },
        },
      },
      {
        id: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
        shape: 'custom-node',
        data: {
          id: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
          name: '2022',
          state: null,
          tags: [
            '矿业权更新',
          ],
          outsideLabel: '变更',
          extraData: {
            mc: 'aaaa',
            fwzb: '',
          },
        },
      },
      {
        id: '7067103e01794a419334690f10c6293c',
        shape: 'custom-node',
        data: {
          id: '7067103e01794a419334690f10c6293c',
          name: '2022',
          state: null,
          tags: [
            '矿业权更新',
          ],
          outsideLabel: '变更',
          extraData: {
            mc: 'aaaa',
            fwzb: '',
          },
        },
      },
      {
        id: 'b83f3407fc2544a797b882f878ff8f6f',
        shape: 'custom-node',
        data: {
          id: 'b83f3407fc2544a797b882f878ff8f6f',
          name: '2022',
          state: null,
          tags: [
            '矿业权更新',
          ],
          outsideLabel: '新立',
          extraData: {
            mc: 'aaaa',
            fwzb: '',
          },
        },
      },
      {
        id: 'f88bdc435b984ac6882158fe16642782',
        shape: 'custom-node',
        data: {
          id: 'f88bdc435b984ac6882158fe16642782',
          name: '2022',
          state: null,
          tags: [
            '矿业权更新',
          ],
          outsideLabel: '变更',
          extraData: {
            mc: 'aaaa',
            fwzb: '',
          },
        },
      },
    ],
    edges: [
      {
        shape: 'yellow-edge',
        source: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
        target: 'edb94526d5d34c2dacde56c692ac5047',
        labels: [// label的数据格式
          {
            attrs: {
              label: { text: '测试', data: JSON.stringify({ text: '你妹' }) },
              body: {
                fill: 'red',
              },
            },
          },
          {
            attrs: {
              label: { text: '测试2', data: JSON.stringify({ text: '你妹2' }) },
              body: {
                fill:
                  'yellow',
              },
            },
            position: {
              distance: 0.6,
              options: {
                absoluteDistance: true,
              },
            },
          },
        ],
      },
      {
        shape: 'yellow-edge',
        source: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
        target: '7067103e01794a419334690f10c6293c',
        labels: [// label的数据格式
          {
            attrs: {
              label: { text: '测试', data: JSON.stringify({ text: '你妹' }) },
              body: {
                fill: 'red',
              },
            },
          },
          {
            attrs: {
              label: { text: '测试2', data: JSON.stringify({ text: '你妹2' }) },
              body: {
                fill:
                  'yellow',
              },
            },
            position: {
              distance: 0.6,
              options: {
                absoluteDistance: true,
              },
            },
          },
        ],
      },
      {
        shape: 'yellow-edge',
        labels: null,
        source: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
        target: 'f88bdc435b984ac6882158fe16642782',
      },
      {
        shape: 'yellow-edge',
        labels: null,
        source: '7067103e01794a419334690f10c6293c',
        target: 'edb94526d5d34c2dacde56c692ac5048',
      },
      {
        shape: 'yellow-edge',
        labels: null,
        source: 'b83f3407fc2544a797b882f878ff8f6f',
        target: '4f46d95ac7c44b9a9668ffb6e5e8d30f',
      },
      {
        shape: 'yellow-edge',
        labels: null,
        source: 'f88bdc435b984ac6882158fe16642782',
        target: 'edb94526d5d34c2dacde56c692ac5048',
      },
    ],
  }
}
</script>

<style scoped lang="less">

</style>
