import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import UserDefinedComponents from '../packages';

Vue.config.productionTip = false;
Vue.use(Antd);

// 全局注册
Vue.use(UserDefinedComponents);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
