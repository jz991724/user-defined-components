/**
* @描述: CarouselTable
* @作者: 张俊
* @创建时间: 2022-03-04 11:17:48
*/
<template>
  <div>
    <div class="flex tableHead" :class="{'bordered':bordered}">
      <template v-for="{key,title,width,align} in columns">
        <div :style="{width:width||getAverageColumnWidth,textAlign:align||'left'}"
             :key="key"
             :class="{'bordered':bordered}">
          {{
            title
          }}
        </div>
      </template>
    </div>
    <a-carousel v-if="dataSource.length>0"
                dot-position="right"
                :dots="false"
                ref="tableContent"
                class="tableContent"
                :class="{'bordered':bordered}"
                v-bind="{...defaultOption,...$attrs}">
      <template v-for="record,index in dataSource">
        <div class="row" :key="record[rowKey]" @click="emitRowClick({record,index})">
          <template v-for="column in columns">
            <div
              :style="{width:column.width||getAverageColumnWidth,wordBreak:'break-all',textAlign:column.align||'left'}"
              :class="{'text-cut':column.ellipsis,'bordered':bordered}"
              :key="column.key||column.dataIndex">
              <slot v-if="column.scopedSlots&&column.scopedSlots.customRender"
                    :name="column.key||column.dataIndex"
                    :text="record[column.scopedSlots.customRender]"
                    :record="record"
                    :index="index">
                {{
                  record[column.key || column.dataIndex] || ''
                }}
              </slot>
              <template v-else>
                {{ record[column.key || column.dataIndex] || '' }}
              </template>
            </div>
          </template>
        </div>
      </template>
    </a-carousel>
    <slot v-else name="empty">
      <a-empty class="text-white padding"></a-empty>
    </slot>
  </div>

</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue, Watch,
} from 'vue-property-decorator';

export interface ColumnTemplate {
  dataIndex: string;
  key: string;
  title: string;
  width: string;
  ellipsis: boolean;
  align: string;
  scopedSlots: { customRender: string };
}

@Component({ name: 'CarouselTable' })
export default class CarouselTable extends Vue {
  @Prop({
    type: Array,
    default: () => ([]),
  }) columns: ColumnTemplate[] | undefined;

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

  @Prop({
    type: Boolean,
    default: false,
  }) bordered: boolean | undefined;

  @Prop({
    type: String,
    default: '',
  }) rowKey: string | undefined;

  defaultOption = {
    autoplay: true,
  };

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

    if (tempWidth?.length > 0) {
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
        if (document.getElementsByClassName('tableHead')?.length > 0) {
          const styleValue = Object.entries(newVal)
            .map(([key, value]) => `${key}:${value}`);

          document.getElementsByClassName('tableHead')[0].setAttribute('style',
            styleValue.join(';'));
        }
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
        if (document.getElementsByClassName('slick-slider')?.length > 0) {
          const styleValue = Object.entries(newVal)
            .map(([key, value]) => `${key}:${value}`);

          document.getElementsByClassName('slick-slider')[0].setAttribute('style',
            styleValue.join(';'));
        }
      });
    }
  }

  @Watch('dataSource', {
    immediate: true,
    deep: true,
  })
  handleDataSource(newVal, oldVal) {
    if (newVal !== oldVal && newVal.length > 0) {
      this.$nextTick(() => {
        if (document.getElementsByClassName('slick-list')?.length > 0) {
          const rowHeight = document.getElementsByClassName('slick-list')[0].clientHeight || 0;
          // 这里只能延迟处理
          setTimeout(() => {
            document.getElementsByClassName('slick-list')[0].setAttribute('style', `height:${Number(rowHeight) * newVal.length}px`);
          }, 100);
        }

        (this.$refs.tableContent as any).goTo(0);
      });
    }
  }

  @Emit('rowClick')
  emitRowClick(rowData) {
    return rowData;
  }
}
</script>

<style scoped lang="less">
.tableHead {
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
  background: #fafafa;
  transition: background .3s ease;
  overflow-wrap: break-word;
  box-sizing: border-box;

  &.bordered {
    border: 1px solid #e8e8e8;
  }

  & > div {
    padding: 16px;

    &.bordered {
      border-right: 1px solid #e8e8e8;

      &:last-child {
        border-right: 0;
      }
    }
  }
}

.tableContent {
  border-top: 0;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  box-sizing: border-box;

  /deep/ .slick-slide {
    pointer-events: unset;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
  }

  &.bordered {
    border: 1px solid #e8e8e8;
  }

  .row {
    border-bottom: 1px solid #e8e8e8;

    & > div {
      padding: 16px;
      box-sizing: border-box;

      &.bordered {
        border-right: 1px solid #e8e8e8;

        &:last-child {
          border-right: 0;
        }
      }
    }
  }
}

.ant-carousel {
  /deep/ .slick-slider {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .slick-list {
      //height: 100% !important;
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
