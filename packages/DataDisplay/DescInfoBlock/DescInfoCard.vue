/**
* @描述: Descriptions描述信息的card
* @作者: 张俊
* @创建时间: 2022-02-21 08:59:48
*/
<template>
  <a-card :hoverable="true"
          :body-style="{padding: '16px'}"
          style="border-radius: 4px;"
          @mouseover="isHoverCard=true"
          @mouseout="isHoverCard=false"
          :loading="loading"
          v-bind="$attrs"
          @click="handleClick">
    <div slot="cover" class="bg-black-15" style="height: 144px;">
      <template v-if="getDescInfo.cover">
        <img v-if="!isErrorImage"
             class="response"
             :class="{active:isHoverCard}"
             @error="onErrorImage"
             :src="getDescInfo.cover"/>

        <template v-else>
          <a-empty description="暂无图片" style="padding: 22px;" :class="{active:isHoverCard}">
            <img slot="image" src="/image/emptyImg_icon.png" height="64" width="64"/>
          </a-empty>
        </template>
      </template>
      <template v-else>
        <a-empty description="暂无图片" style="padding: 22px;" :class="{active:isHoverCard}">
          <img slot="image" src="/image/emptyImg_icon.png" height="64" width="64"/>
        </a-empty>
      </template>
    </div>

    <slot v-bind="dataSource"></slot>

    <a-card-meta style="position: relative;z-index: 10;">
      <template slot="description">
        <template v-for="{title,key,value,span,customRender} in getDescInfo.info">
          <div class="flex" :key="key">
            <slot :name="`${key}_label`"
                  v-bind="{value,title,info:getDescInfo.info,dataSource,text:value}">
              <div slot="label"
                   class="xf-text-12 xf-text-regular text-black-45 xf-padding-bottom-xs xf-text-inline">
                {{ title }}：
              </div>
            </slot>

            <slot :name="key" v-bind="{key,title,value,span,dataSource}">
              <div v-if="customRender"
                   class="xf-text-12 xf-text-regular text-black text-cut"
                   v-html="customRender(value||dataSource[key])"></div>
              <div v-else
                   class="xf-text-12 xf-text-regular text-black text-cut"
                   :title="value||(dataSource[key]||'')"
                   v-html="value||(dataSource[key]||'')"></div>
            </slot>
          </div>
        </template>
      </template>
    </a-card-meta>

    <slot name="footer" v-bind="dataSource"></slot>
  </a-card>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Emit,
} from 'vue-property-decorator';

@Component({ name: 'DescInfoCard' })
export default class DescInfoCard extends Vue {
  @Prop({
    type: Object,
    default: () => ({}),
  }) dataSource: any | undefined;

  @Prop({
    type: Array,
    default: () => ([]),
  }) descColumns: any[] | undefined;

  @Prop({ type: String }) coverImageSrc: string | undefined;

  @Prop({ type: String }) coverImageKey: string | undefined;

  @Prop({
    type: Boolean,
    default: true,
  }) loading: boolean | undefined;

  @Prop({
    type: String,
    default: () => '',
  }) fileResourceUrl: string | undefined;

  isHoverCard = false;

  isErrorImage = false;

  getCoverImageUrl(coverImageSrc) {
    if (coverImageSrc) {
      return `${this.fileResourceUrl}${coverImageSrc}?op=OPEN`;
    }

    return undefined;
  }

  onErrorImage({
    srcElement,
    type,
  }) {
    this.isErrorImage = type === 'error';
    console.warn('图片路径异常', { path: srcElement.currentSrc });
  }

  get getDescInfo() {
    this.isErrorImage = false;
    const {
      coverImageKey,
      descColumns,
    } = this;
    if (coverImageKey) {
      const coverImg = this.dataSource[coverImageKey];
      if (coverImg) {
        return {
          cover: this.getCoverImageUrl(coverImg),
          info: descColumns,
        };
      }
    }
    return {
      cover: this.getCoverImageUrl(this.coverImageSrc),
      info: descColumns,
    };
  }

  @Emit('click')
  handleClick() {
    return { ...this.dataSource };
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-card-cover {
  .active {
    transform: scale(1.15);
    transition: all 500ms ease;
  }

  .ant-empty-image {
    height: auto;
  }
}
</style>
