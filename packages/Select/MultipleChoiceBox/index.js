// 导入组件，组件必须声明 name
import MultipleChoiceBox from './MultipleChoiceBox.vue';

// 为组件提供 install 安装方法，供按需引入
MultipleChoiceBox.install = (Vue) => {
  Vue.component(MultipleChoiceBox.name, MultipleChoiceBox);
};

// 导出组件
export default MultipleChoiceBox;
