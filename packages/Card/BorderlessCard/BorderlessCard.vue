/**
* @描述: 无边框card
* @作者: 张俊
* @创建时间: 2021-06-25 16:01:08
*/
<template>
  <a-card class="response"
          v-bind="{...options,...$attrs}"
          :bordered="false">
    <template slot="title">
      <slot name="title">
        <div class="xf-text-16 text-black-85 xf-text-semibold" v-if="title">{{ title }}</div>
      </slot>
    </template>

    <template slot="extra">
      <slot name="extra"></slot>
    </template>
    <slot></slot>
  </a-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'BorderlessCard' })
export default class BorderlessCard extends Vue {
  @Prop({ type: String, default: '' }) title: string | undefined;

  options = {
    headStyle: { border: 0 },
    bodyStyle: { paddingTop: 0 },
  };
}
</script>

<style scoped lang="less">
///deep/ .ant-card-head-title {
//  font-weight: bold;
//}
</style>
