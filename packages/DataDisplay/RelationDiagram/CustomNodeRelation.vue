/**
* @描述: CustomNode 自定义节点
* @作者: 张俊
* @创建时间: 2022-06-02 11:55:43
*/
<template>
  <div @mouseenter="onHover(true)"
       @mouseleave="onHover(false)">
    <a-card v-if="nodeData.color"
            hoverable
            size="small"
            :style="getStyle"
            v-bind="getConfig">
      <div slot="title" class="title">
        {{ nodeData.name }}
        <template v-if="nodeData.extraData&&nodeData.extraData.qfsj">
          ({{
            nodeData.extraData.qfsj
          }})
        </template>
      </div>
      <template slot="extra">
        <a-checkbox style="margin-left: 8px;"></a-checkbox>
      </template>

      <div class="content">
        {{ nodeData.extraData.xkzh || '' }}
      </div>
    </a-card>

    <a-card v-else
            hoverable
            size="small"
            :body-style="{height:'70px'}"
            :style="getStyle"
            v-bind="getConfig">
      <a-empty description="无对应数据"
               style="margin: auto;"
               :imageStyle="{width:'32px',height: 'auto',margin:'auto'}"></a-empty>
    </a-card>
  </div>
</template>

<script lang="ts">
import {
  Component, Inject, Prop, Vue,
} from 'vue-property-decorator';

@Component({ name: 'CustomNodeRelation' })
export default class CustomNodeRelation extends Vue {
  @Inject() getGraph: any;

  @Inject() getNode: any;

  node;

  graph;

  nodeData: any = {};

  defaultOptions = {
    bodyStyle: {
      minWidth: '175px',
      padding: '6px 12px',
    },
  }

  isHover = false;

  onHover(active = false) {
    this.isHover = active;
  }

  /**
   * @desc hex->rgba
   * @author 张俊
   * @date 2022/9/6 13:59
   * @param null
   * @return null
   */
  colorHex2RGBA(hex, opacity) {
    return `rgba(${parseInt(`0x${hex.slice(1, 3)}`)},${parseInt(`0x${hex.slice(3, 5)}`)},${
      parseInt(`0x${hex.slice(5, 7)}`)},${opacity})`;
  }

  get getStyle() {
    const { color, active } = this.nodeData;
    if (this.isHover && !active && color) {
      return `box-shadow: 0 2px 8px ${this.colorHex2RGBA(color, 0.4)}`;
    }
    if (active) {
      return `box-shadow: 0 0px 8px ${this.colorHex2RGBA(color, 0.8)};border:1px solid ${color}`;
    }

    return 'box-shadow: 0 2px 8px rgb(0 160 160 / 9%)';
  }

  get getConfig() {
    let { color } = this.nodeData;
    color = color || '#00A0A0';
    return {
      ...this.defaultOptions,
      ...this.$attrs,
      headStyle: {
        border: 0,
        background: this.colorHex2RGBA(color, 0.2),
        color,
      },
    };
  }

  mounted() {
    this.node = this.getNode();
    this.graph = this.getGraph();

    this.nodeData = this.node.getData();
  }
}
</script>

<style scoped lang="less">
@borderColor: rgba(0, 160, 160, 1);

///deep/ .ant-card {
//  &:hover {
//    box-shadow: 0px 0px 10px rgba(0, 160, 160, .4) !important;
//  }
//}

.title {
  font-weight: 500;
  font-style: normal;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.content {
  word-break: break-all;
  font-weight: 400;
  font-style: normal;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
}

/deep/ .ant-checkbox {
  .ant-checkbox-inner {
    background-color: #fff;
    border-color: @borderColor !important;
  }

  &::after {
    border-color: @borderColor;
  }
}

/deep/ .ant-checkbox-checked {
  .ant-checkbox-inner {
    background-color: #fff;
    border-color: @borderColor !important;

    &::after {
      border-color: @borderColor;
    }
  }
}

/deep/ .ant-empty-image {
  svg {
    width: 32px;
  }
}
</style>
