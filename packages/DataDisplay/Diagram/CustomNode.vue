/**
* @描述: CustomNode 自定义节点
* @作者: 张俊
* @创建时间: 2022-06-02 11:55:43
*/
<template>
  <div>
    <div v-if="nodeData.tags&&nodeData.tags.length>0"
         class="text-right"
         style="position: absolute;right: 45px;bottom: 8px;">
      <a-tag v-for="tag,index in nodeData.tags"
             :key="index"
             color="transparent"
             class="text-bold"
             :style="{marginTop:index===0?0:'5px',color:'#fff',borderColor:'#fff'}">{{ tag }}
      </a-tag>
    </div>
    <a-button v-if="nodeData.name||nodeData.state"
              :type="nodeData.state?nodeData.state:'primary'"
              shape="circle"
              style="font-size:10px;border-color: #fff;">
      {{ nodeData.name }}
    </a-button>
    <div v-if="nodeData.outsideLabel"
         class="text-white text-bold text-left"
         style="max-width: 100px;position: absolute;left: 45px;bottom: 0;white-space: nowrap;padding:10px 0;">
      {{ nodeData.outsideLabel || '' }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Inject, Prop, Vue,
} from 'vue-property-decorator';

@Component({ name: 'CustomNode' })
export default class CustomNode extends Vue {
  @Inject() getGraph: any;

  @Inject() getNode: any;

  node;

  graph;

  nodeData: any = {};

  mounted() {
    this.node = this.getNode();
    this.graph = this.getGraph();

    this.nodeData = this.node.getData();
    debugger;

    // 监听数据改变事件
    this.node.on('change:data', (params) => {
      debugger;
    });
  }
}
</script>

<style scoped lang="less">

</style>
