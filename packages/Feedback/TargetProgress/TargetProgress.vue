/**
* @描述: Progress 进度条
* @作者: 张俊
* @创建时间: 2022-04-24 15:07:19
*/
<template>
  <div>
    <a-progress v-bind="$attrs"
                :percent="getPercent"
                :showInfo="false"
                :strokeWidth="strokeWidth"
                strokeLinecap="square">
    </a-progress>

    <div style="position: relative;">
      <template v-for="item,index in targetList">
        <a-tooltip :key="index">
          <template slot="title">
            <span>{{ item.title }}</span>
          </template>
          <div :style="item | getMarkStyle(total,strokeWidth)">
            <div>
              <a-divider type="vertical" :style="{height:`calc(${strokeWidth}px + 4px)`}"/>
            </div>
            <a-icon type="caret-up" :style="{color:item.color,fontSize:`${item.size}px`}"/>
          </div>
        </a-tooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BigNumber } from 'bignumber.js';

@Component({
  name: 'TargetProgress',
  filters: {
    getMarkStyle({
      size,
      value,
    }, total, strokeWidth) {
      size = size || 14;
      let percent = new BigNumber(value).div(total)
        .times(100)
        .toNumber();
      percent = percent >= 100 ? 100 : percent;
      const style = {
        width: 'fit-content',
        position: 'absolute',
        top: `calc(-${strokeWidth}px - 2px)`,
        display: 'inline-block',
        left: `calc(${percent}% - ${(size / 2) + 1}px)`,
        // marginLeft: `${percent}%`,
      };
      return style;
    },
  },
})
export default class TargetProgress extends Vue {
  // 总值
  @Prop({
    type: Number,
    default: 100,
  }) total: number | string;

  @Prop({
    type: Array,
    default: () => ([]),
  }) targetList: any[] | undefined;

  @Prop({
    type: Number,
    default: 0,
  }) successValue: number | string;

  // 进度条线的宽度，单位 px
  @Prop({
    type: Number,
    default: 10,
  }) strokeWidth: number | string;

  get getPercent(): number {
    return new BigNumber(this.successValue).div(this.total)
      .times(100)
      .toNumber();
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-progress-inner {
  border-radius: 0;
}
</style>
