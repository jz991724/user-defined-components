/**
* @描述: CustomNode 自定义节点
* @作者: 张俊
* @创建时间: 2022-06-02 11:55:43
*/
<template>
  <div style="position: absolute;">
    <div v-if="nodeData.tags&&nodeData.tags.length>0"
         class="text-right"
         style="position: absolute;right: 28px;bottom: 4px;">
      <a-tag v-for="tag,index in nodeData.tags"
             :key="index"
             color="transparent"
             class="text-bold"
             @click.stop="clickTag({nodeData,e:$event})"
             :style="{marginTop:index===0?0:'5px',color:'#fff',borderColor:'#fff'}">{{ tag }}
      </a-tag>
    </div>
    <a-button v-if="nodeData.name||nodeData.state"
              :type="nodeData.state?nodeData.state:'primary'"
              @click="nodeClick({nodeData,e:$event})"
              style="padding: 0;width: 50px;height: 50px;border-color: rgba(255, 255, 255, 0.45);border-radius: 5px;">
      <div style="text-overflow: ellipsis;overflow: hidden;padding: 5px;font-weight: 500;">
        {{ nodeData.name }}
      </div>
    </a-button>
    <div v-if="nodeData.outsideLabel"
         class="text-white text-bold text-left"
         style="position: absolute;left: 65px;bottom: 0;white-space: nowrap;height: 45px;">
      <div> {{ nodeData.outsideLabel || '' }}</div>
      <div>
        <a href="#" @click="outsideLabelClick({nodeData,e:$event})">
          详情
          <a-icon type="right"></a-icon>
        </a>
      </div>
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

    // 监听数据改变事件
    this.node.on('change:data', (params) => {
      debugger;
    });
  }

  clickTag(params) {
    debugger;
  }

  nodeClick(params) {
    debugger;
  }

  outsideLabelClick(params) {
    debugger;
  }
}
</script>

<style scoped lang="less">

</style>
