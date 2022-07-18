/**
* @描述: NoticeBar_Example
* @作者: 张俊
* @创建时间: 2022-07-18 15:59:34
*/
<template>
  <notice-bar :data-source="data" :timeout="2000">
    <div slot-scope="{item}" :key="item.id">
      <a-icon type="notification" theme="twoTone"/>
      <a>{{ item.text }}</a>
    </div>
  </notice-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NoticeBar from '../../../packages/DataDisplay/NoticeBar/NoticeBar.vue';

@Component({
  name: 'NoticeBarExample',
  components: { NoticeBar },
})
export default class NoticeBarExample extends Vue {
  data = ['通告一', '通告二', '通告三', '通告四'];
}
</script>

<style scoped lang="less">

</style>
