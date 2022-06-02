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

@Component({ name: 'DiagramExample' })
export default class DiagramExample extends Vue {
  data: any = {
    // 节点
    nodes: [
      {
        id: 'node2', // String，可选，节点的唯一标识
        shape: 'custom-node',
        data: {
          name: '测试',
          state: 'danger',
          tags: ['小朋友', '二条街'],
          outsideLabel: '测试11acsdcsddcsdcsd',
        },
      },
      {
        id: 'node3', // String，可选，节点的唯一标识
        shape: 'custom-node',
        label: 'hello', // String，节点标签
        data: {
          name: '测试',
          state: '',
        },
      },
      {
        id: 'node4', // String，节点的唯一标识
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
      },
    ],
    // 边
    edges: [
      {
        shape: 'yellow-edge',
        labels: ['边label'],
        source: 'node2', // String，必须，起始节点 id
        target: 'node3', // String，必须，目标节点 id
      },
      {
        source: 'node2', // String，必须，起始节点 id
        target: 'node4', // String，必须，目标节点 id
      },
    ],
  };

  // mounted() {
  //   setTimeout(() => {
  //     this.data = {
  //       // 节点
  //       nodes: [
  //         ...this.data.nodes,
  //         {
  //           id: 'node10', // String，可选，节点的唯一标识
  //           shape: 'custom-node',
  //           label: 'hello', // String，节点标签
  //         },
  //         {
  //           id: 'node20', // String，节点的唯一标识
  //           label: 'world', // String，节点标签
  //           width: 80, // Number，可选，节点大小的 width 值
  //           height: 40, // Number，可选，节点大小的 height 值
  //         },
  //       ],
  //       // 边
  //       edges: [
  //         ...this.data.edges,
  //         {
  //           source: 'node10', // String，必须，起始节点 id
  //           target: 'node20', // String，必须，目标节点 id
  //         },
  //       ],
  //     };
  //   }, 5000);
  // }
}
</script>

<style scoped lang="less">

</style>
