/**
* @描述: MyButton
* @作者: 张俊
* @创建时间: 2022-02-15 17:17:51
*/
<template>
  <a-button>
    <slot>测试</slot>
  </a-button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'MyButton' })
export default class MyButton extends Vue {

}
</script>

<style scoped lang="less">

</style>
