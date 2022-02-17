// 导入组件，组件必须声明 name
import RangePicker from './RangePicker.vue';

// 为组件提供 install 安装方法，供按需引入
RangePicker.install = (Vue) => {
  Vue.component(RangePicker.name, RangePicker);
};

// 导出组件
export default RangePicker;
