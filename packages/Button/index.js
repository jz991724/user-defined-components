// 导入组件，组件必须声明 name
import myButton from './MyButton.vue';

// 为组件提供 install 安装方法，供按需引入
myButton.install = (vue) => {
  vue.components(myButton.name, myButton);
};

// 导出组件
export default myButton;
