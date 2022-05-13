<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import { copyRightConsole } from '../packages/Services';

const packageInfo = require('../package.json');

@Component({})
export default class App extends Vue {
  locale = zhCN;

  created() {
    // 设置版权休息console
    copyRightConsole(packageInfo, moment()
      .format('YYYY-MM-DD HH:mm:ss'));
  }
}
</script>

<style lang="less">
@import 'styles/colorui/main.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
