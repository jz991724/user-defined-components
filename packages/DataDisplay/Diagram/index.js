// 导入组件，组件必须声明 name
import Diagram from './Diagram.vue';

// 为组件提供 install 安装方法，供按需引入
Diagram.install = (Vue) => {
  Vue.component(Diagram.name, Diagram);
};

// 导出组件
export default Diagram;
