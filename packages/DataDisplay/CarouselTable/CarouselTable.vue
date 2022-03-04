/**
* @描述: CarouselTable
* @作者: 张俊
* @创建时间: 2022-03-04 11:17:48
*/
<template>
  <div>
    <div class="flex tableHead">
      <template v-for="{key,title,width} in columns">
        <div :style="{width:width||getAverageColumnWidth}" :key="key">{{ title }}</div>
      </template>
    </div>
    <a-carousel dot-position="right"
                :dots="false"
                class="tableContent"
                :autoplay="true">
      <template v-for="record,index in dataSource">
        <div class="row" :key="index">
          <template v-for="column in columns">
            <div :style="{width:column.width||getAverageColumnWidth}"
                 :key="column.key">
              <slot v-if="column.scopedSlots&&column.scopedSlots.customRender"
                    :name="column.key"
                    :text="record[column.scopedSlots.customRender]"
                    :record="record">
                {{
                  record[column.key] || ''
                }}
              </slot>
              <template v-else>
                {{ record[column.key] || '' }}
              </template>
            </div>
          </template>
        </div>
      </template>
    </a-carousel>
  </div>

</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

export interface columnTemplate {
  dataIndex: string,
  key: string,
  title: string,
  width: string,
  scopedSlots: { customRender: string }
}

@Component({ name: 'CarouselTable' })
export default class CarouselTable extends Vue {
  @Prop({
    type: Array,
    default: () => ([]),
  }) columns: columnTemplate[] | undefined;

  @Prop({
    type: Array,
    default: () => ([]),
  }) dataSource: any[] | undefined;

  @Prop({
    type: Object,
    default: () => ({}),
  }) headStyle: any | undefined;

  @Prop({
    type: Object,
    default: () => ({}),
  }) bodyStyle: any | undefined;

  // 格式化column的width
  get getAverageColumnWidth() {
    let averageColumnWidth = '';
    const tempWidth = [];
    let count = 0;
    this.columns.forEach(({ width }) => {
      if (width) {
        tempWidth.push(width);
      } else {
        count++;
      }
    });

    if (count > 0) {
      averageColumnWidth = `calc((100% - ${tempWidth.join(' - ')}) / ${count})`;
    } else {
      averageColumnWidth = `calc(100%  / ${count})`;
    }

    return averageColumnWidth;
  }

  @Watch('headStyle', {
    immediate: true,
    deep: true,
  })
  handleHeadStyle(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.$nextTick(() => {
        debugger;
        const styleValue = Object.entries(newVal)
          .map(([key, value]) => `${key}:${value}`);

        debugger;
        document.getElementsByClassName('tableHead')[0].setAttribute('style',
          styleValue.join(';'));
      });
    }
  }

  @Watch('bodyStyle', {
    immediate: true,
    deep: true,
  })
  handleBodyStyle(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.$nextTick(() => {
        debugger;
        const styleValue = Object.entries(newVal)
          .map(([key, value]) => `${key}:${value}`);

        debugger;
        document.getElementsByClassName('slick-slider')[0].setAttribute('style',
          styleValue.join(';'));
      });
    }
  }
}
</script>

<style scoped lang="less">
.ant-carousel {
  /deep/ .slick-slider {
    height: 100%;
    width: 100%;
    background: #364d79;
    overflow: hidden;

    .slick-list {
      height: 100% !important;
      overflow-y: auto;

      .row {
        display: flex !important;
      }

      &:hover {
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          border-radius: 3px;
          display: unset;
        }
      }

      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 3px;
        display: none;
      }

      /*定义滚动条轨道 内阴影+圆角*/

      &::-webkit-scrollbar-track {
        //-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.08);
      }

      /*定义滑块 内阴影+圆角*/

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        //-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background: rgba(255, 255, 255, 0.25);
      }
    }
  }
}
</style>
