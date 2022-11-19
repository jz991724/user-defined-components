// 导入组件，组件必须声明 name
import RelationDiagram from './RelationDiagram.vue';

// 为组件提供 install 安装方法，供按需引入
RelationDiagram.install = (Vue) => {
  Vue.component(RelationDiagram.name, RelationDiagram);
};

// 导出组件
export default RelationDiagram;
