/**
* @描述: TargetProgress_Example
* @作者: 张俊
* @创建时间: 2022-06-17 12:01:16
*/
<template>
  <target-progress :strokeWidth="40"
                   :success-value="80.5333"
                   :target-list="targetList"></target-progress>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TargetProgress from '../../../packages/Feedback/TargetProgress/TargetProgress.vue';

@Component({
 name: 'TargetProgressExample',
  components: { TargetProgress },
})
export default class TargetProgressExample extends Vue {
  targetList = [{
    title: '目标',
    color: 'red',
    value: 60,
    size: 30,
  }, {
    title: '目标1',
    color: 'green',
    value: 100,
    size: 30,
  }, {
    title: '目标2',
    color: 'yellow',
    value: 20,
    size: 30,
  }];
}
</script>

<style scoped lang="less">

</style>
