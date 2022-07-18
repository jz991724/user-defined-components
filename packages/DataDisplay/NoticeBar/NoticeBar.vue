/**
* @描述: NoticeBar 公告条
* @作者: 张俊
* @创建时间: 2022-07-18 15:49:27
*/
<template>
  <div class="noticeBar">
    <transition name="slide" v-if="dataSource.length">
      <slot :item="item">
        <div :key="item.id">{{ item.text }}</div>
      </slot>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component({ name: 'NoticeBar' })
export default class NoticeBar extends Vue {
  @Prop({ type: Array, default: () => ([]) }) dataSource: {
    id: string, text: string, extraData: Record<any,
      any>
  }[] | undefined

  // 间隔时间
  @Prop({ type: Number, default: 1000 }) timeout: number | undefined

  // 当前显示的通告的索引index
  activeIndex = 0;

  timer = null;

  get item() {
    return {
      id: this.activeIndex,
      text: this.dataSource[this.activeIndex],
    };
  }

  // 开始翻滚
  startMove() {
    this.timer = setTimeout(() => {
      if (this.activeIndex === this.dataSource.length - 1) {
        this.activeIndex = 0;
      } else {
        this.activeIndex += 1;
      }
      this.startMove();
    }, this.timeout); // 滚动不需要停顿则将2000改成动画持续时间
  }

  // 结束
  stopMove() {
    clearTimeout(this.timer);
    this.timer = null;
    this.activeIndex = 0;
  }

  destroyed() {
    this.stopMove();
  }

  // 数据源变化
  @Watch('dataSource', { immediate: true, deep: true })
  handleDataSourceChange(newVal, oldVal) {
    this.stopMove();
    this.startMove();
  }

  // 间隔时间变化
  @Watch('timeout')
  handleTimeoutChange(newVal, oldVal) {
    if (newVal !== oldVal && newVal) {
      this.stopMove();
      this.startMove();
    }
  }
}
</script>

<style scoped lang="less">
.noticeBar {
  height: 30px;
  line-height: 30px;
  position: relative;
  overflow: hidden;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s linear;
}

.slide-leave-to {
  transform: translateY(-50px);
}

.slide-enter {
  transform: translateY(50px);
}
</style>
