<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <my-button>哈哈哈哈哈</my-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyButton from '../../packages/Button/MyButton.vue'; // @ is an alias to /src

@Component({
  components: {
    MyButton,
  },
})
export default class Home extends Vue {}
</script>
