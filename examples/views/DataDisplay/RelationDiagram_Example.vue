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
        id: '44bc0f6f121211ed96db37c0a86c327b',
        shape: 'custom-node-relation',
        data: {
          id: '44bc0f6f121211ed96db37c0a86c327b',
          name: '在办延续',
          color: '#f06450',
          active: false,
          extraData: {
            mc: '云南省巍山县龙潭铅锌多金属矿普查',
            guid: '14010461',
            xkzh: 'T01120100602040828',
            xmdah: '0100000710167',
            xmlx: 130030,
            xmlxmc: '在办延续',
            fwzb: '1,8,100.0500910,25.1700295,100.0500910,25.1730296,100.0530910,25.1730295,100.0530910,25.1522295,100.0413909,25.1524295,100.0412909,25.1630296,100.0445910,25.1630295,100.0445910,25.1700295,0,0,0,',
            qfsj: '2017-02-24',
          },
        },
      },
      {
        id: '44bbc14e121211ed96db37c0a86c327b',
        shape: 'custom-node-relation',
        data: {
          id: '44bbc14e121211ed96db37c0a86c327b',
          name: '在办变更',
          color: '#00a0a0',
          active: false,
          extraData: {
            mc: '云南省巍山县龙潭铅锌多金属矿普查',
            guid: '13010005',
            xkzh: 'T01120100602040828',
            xmdah: '0100000710167',
            xmlx: 130020,
            xmlxmc: '在办变更',
            fwzb: '1,8,100.0457,25.1700,100.0457,25.1730,100.0527,25.1730,100.0527,25.1500,100.0344,25.1500,100.0344,25.1630,100.0442,25.1630,100.0442,25.1700,0,0,0,',
            qfsj: '2013-01-18',
          },
        },
      },
      {
        id: '4b6e1467121211ed96db37c0a86c327b',
        shape: 'custom-node-relation',
        data: {
          id: '4b6e1467121211ed96db37c0a86c327b',
          name: '在办延续',
          color: '#fabe00',
          active: false,
          extraData: {
            mc: '云南省巍山县龙潭铅锌多金属矿普查',
            guid: '10010383',
            xkzh: 'T01120100602040828',
            xmdah: '0100000710167',
            xmlx: 130030,
            xmlxmc: '在办延续',
            fwzb: '1,8,100.0345,25.1500,100.0345,25.1630,100.0400,25.1630,100.0400,25.1700,100.0430,25.1700,100.0430,25.1800,100.0530,25.1800,100.0530,25.1500,0,0,0,',
            qfsj: '2010-06-04',
          },
        },
      },
    ],
    edges: [
      {
        source: '4b6e1467121211ed96db37c0a86c327b',
        target: '44bbc14e121211ed96db37c0a86c327b',
        attrs: {
          line: {
            stroke: '#00A0A0',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      },
      {
        source: '44bbc14e121211ed96db37c0a86c327b',
        target: '44bc0f6f121211ed96db37c0a86c327b',
        attrs: {
          line: {
            stroke: '#00A0A0',
            strokeWidth: 1,
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
