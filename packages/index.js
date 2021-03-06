// 导入组件
import MultipleChoiceBox from './Select/MultipleChoiceBox';
import RangePicker from './Select/RangePicker';
import TabsModal from './Tabs/TabsModal';

// card
import BorderlessCard from './Card/BorderlessCard';
import DescInfoCard from './DataDisplay/DescInfoBlock';

// DataDisplay
import CarouselTable from './DataDisplay/CarouselTable';
import { customRenderMerger } from './Services';
import Diagram from './DataDisplay/Diagram';
import NoticeBar from './DataDisplay/NoticeBar';

// Feedback
import TargetProgress from './Feedback/TargetProgress';

// 组件列表
const components = [MultipleChoiceBox, RangePicker, TabsModal, BorderlessCard, DescInfoCard, CarouselTable, TargetProgress, Diagram, NoticeBar];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = (Vue) => {
  // 判断是否安装
  if (!install.installed) {
    // 遍历注册全局组件
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  }
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const UserDefinedComponents = {
  install, // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  MultipleChoiceBox,
  RangePicker,
  TabsModal,
  BorderlessCard,
  DescInfoCard,
  CustomRenderMerger: customRenderMerger,
  TargetProgress,
  Diagram,
  NoticeBar,
};

export default UserDefinedComponents;
