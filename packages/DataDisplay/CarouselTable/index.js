// 导入组件，组件必须声明 name
import CarouselTable from './CarouselTable.vue';

// 为组件提供 install 安装方法，供按需引入
CarouselTable.install = (Vue) => {
  Vue.component(CarouselTable.name, CarouselTable);
};

// 导出组件
export default CarouselTable;
