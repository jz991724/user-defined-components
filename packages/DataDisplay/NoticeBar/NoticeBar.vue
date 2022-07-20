/**
* @描述: NoticeBar 公告条
* @作者: 张俊
* @创建时间: 2022-07-18 15:49:27
*/
<template>
  <div>
    <vue-seamless-scroll v-if="dataSource.length"
                         :data="dataSource"
                         :class-option="getOptions"
                         class="seamless-warp">
      <div class="flex content">
        <slot :items="dataSource">
          <div v-for="(item,index) in dataSource" :key="item.id||index"
               class="margin-right-sm">
            {{ item.text }}
          </div>
        </slot>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import vueSeamlessScroll from 'vue-seamless-scroll';
import $ from 'jquery';

@Component({ name: 'NoticeBar', components: { vueSeamlessScroll } })
export default class NoticeBar extends Vue {
  @Prop({
    type: Array,
    default: () => ([]),
  }) dataSource: { id: string, text: string, extraData: Record<any, any> }[] | undefined

  // 开启无缝滚动的数据量
  @Prop({ type: Number, default: 3 }) limitMoveNum: number | undefined

  // 方向（方向 0 往下 1 往上 2向左 3向右）
  @Prop({ type: String, default: 'left' }) direction: string | undefined

  get getOptions() {
    return {
      direction: { left: 2, right: 3 }[this.direction] || 2,
      limitMoveNum: this.limitMoveNum > this.dataSource.length ? this.dataSource.length : this.limitMoveNum,
    };
  }

  init() {
    const width = $(this.$el)?.find('.content')?.first()?.width();
    $(this.$el).width(width);
  }

  mounted() {
    this.init();
  }
}
</script>

<style scoped lang="less">
.seamless-warp {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
}
</style>
