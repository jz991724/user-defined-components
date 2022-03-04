// 导入组件，组件必须声明 name
import DescInfoCard from './DescInfoCard.vue';

// 为组件提供 install 安装方法，供按需引入
DescInfoCard.install = (Vue) => {
  Vue.component(DescInfoCard.name, DescInfoCard);
};

// 导出组件
export default DescInfoCard;
