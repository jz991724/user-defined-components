// 导入组件，组件必须声明 name
import BorderlessCard from './BorderlessCard.vue';

// 为组件提供 install 安装方法，供按需引入
BorderlessCard.install = (Vue) => {
  Vue.component(BorderlessCard.name, BorderlessCard);
};

// 导出组件
export default BorderlessCard;
