// 导入组件，组件必须声明 name
import NoticeBar from './NoticeBar.vue';

// 为组件提供 install 安装方法，供按需引入
NoticeBar.install = (Vue) => {
  Vue.component(NoticeBar.name, NoticeBar);
};

// 导出组件
export default NoticeBar;
