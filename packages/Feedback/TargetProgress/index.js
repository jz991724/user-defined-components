// 导入组件，组件必须声明 name
import TargetProgress from './TargetProgress.vue';

// 为组件提供 install 安装方法，供按需引入
TargetProgress.install = (Vue) => {
  Vue.component(TargetProgress.name, TargetProgress);
};

// 导出组件
export default TargetProgress;
