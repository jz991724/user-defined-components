// 导入组件，组件必须声明 name
import TabsModal from './TabsModal.vue';

// 为组件提供 install 安装方法，供按需引入
TabsModal.install = (Vue) => {
  Vue.component(TabsModal.name, TabsModal);
};

// 导出组件
export default TabsModal;
