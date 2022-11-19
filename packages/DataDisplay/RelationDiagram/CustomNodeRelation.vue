/**
* @描述: CustomNode 自定义节点
* @作者: 张俊
* @创建时间: 2022-06-02 11:55:43
*/
<template>
  <div>
    <a-card v-if="nodeData.name||nodeData.state"
            hoverable
            size="small"
            style="box-shadow: 0 2px 8px rgb(0 160 160 / 9%);"
            v-bind="getConfig">
      <div slot="title" class="title">{{ nodeData.name }}</div>
      <template slot="extra">
        <a-checkbox @change="onCheckboxChange"></a-checkbox>
      </template>

      <div class="content">
        {{ nodeData.content }}
      </div>
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
      width: '175px',
      padding: '4px 12px',
    },
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

  get getConfig() {
    let { color } = this.nodeData;
    color = color || '#00A0A0';
    return {
      ...this.defaultOptions,
      ...this.$attrs,
      headStyle: {
        border: `1px solid ${color}`,
        background: this.colorHex2RGBA(color, 0.2),
        color,
      },
    };
  }

  // 多选框选择change
  onCheckboxChange(e) {
    debugger;
  }

  mounted() {
    this.node = this.getNode();
    this.graph = this.getGraph();

    this.nodeData = this.node.getData();

    // 监听数据改变事件
    // this.node.on('change:data', (params) => {
    //   debugger;
    // });
  }
}
</script>

<style scoped lang="less">
@borderColor: rgba(0, 160, 160, 1);

/deep/ .ant-card {
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 160, 160, .4) !important;
  }
}

.title {
  font-weight: 500;
  font-style: normal;
  font-size: 12px;
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
</style>
