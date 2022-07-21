/**
* @描述: NoticeBar_Example
* @作者: 张俊
* @创建时间: 2022-07-18 15:59:34
*/
<template>
  <notice-bar :data-source="data" style="border: 1px solid red;padding: 0 24px;">
    <template slot-scope="{items}">
      <div :key="item.id" v-for="item in items" class="margin-right-xs">
        <a-icon type="notification" theme="twoTone" />
        <a>{{ item.text }}</a>
      </div>
    </template>
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
  data = [
    { id: 1, text: '通告1111111111111111111111111111111' },
    { id: 2, text: '通告22222222222222222222222222222' },
    { id: 3, text: '通告333333333333333333333333333333' },
  ];
}
</script>

<style scoped lang="less">

</style>
