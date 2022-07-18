<template>
  <div class="padding-sm">
    <!--    <borderless-card>-->
    <!--      <div class="flex response justify-between">-->
    <!--        <range-picker style="width:400px;" v-model="dates"></range-picker>-->

    <!--        <multiple-choice-box placeholder="请选择"-->
    <!--                             v-model="value"-->
    <!--                             :bordered="true"-->
    <!--                             :required="true"-->
    <!--                             :tree-data="treeData"></multiple-choice-box>-->
    <!--      </div>-->
    <!--    </borderless-card>-->

    <!--    &lt;!&ndash;tabs&ndash;&gt;-->
    <!--    <borderless-card>-->
    <!--      &lt;!&ndash;      <a-locale-provider :locale="locale">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <router-view :key="$route.fullPath"></router-view>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </a-locale-provider>&ndash;&gt;-->
    <!--      <a-button type="primary" @click="onShowTabsModal()">展示tabsModal</a-button>-->
    <!--      <tabs-modal ref="tabsModal"></tabs-modal>-->
    <!--    </borderless-card>-->

    <!--    <CarouselTableExample style="margin:auto;"></CarouselTableExample>-->

    <a-card title="行/列合并" class="margin-tb-lg" style="margin-top: 24px;">
      <merger-table-example></merger-table-example>
    </a-card>

    <a-card title="进度条" style="margin-top: 24px;">
      <target-progress-example></target-progress-example>
    </a-card>

    <a-card title="流程图" style="width: 100%;margin-top: 24px;">
      <diagram-example></diagram-example>
    </a-card>

    <a-card title="公告栏文字停顿滚动" style="width: 100%;margin-top: 24px;">
      <notice-bar-example></notice-bar-example>
    </a-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BorderlessCardExample from './Card/BorderlessCard_Example.vue';
import CarouselTableExample from './DataDisplay/CarouselTable_Example.vue';
import MergerTableExample from './DataDisplay/MergerTable_Example.vue';
import TargetProgress from '../../packages/Feedback/TargetProgress/TargetProgress.vue';
import DiagramExample from './DataDisplay/Diagram_Example.vue';
import TargetProgressExample from './Feedback/TargetProgress_Example.vue';
import NoticeBar from '../../packages/DataDisplay/NoticeBar/NoticeBar.vue';
import NoticeBarExample from './DataDisplay/NoticeBar_Example.vue';

@Component({
  components: {
    NoticeBarExample,
    NoticeBar,
    TargetProgressExample,
    DiagramExample,
    TargetProgress,
    MergerTableExample,
    CarouselTableExample,
    BorderlessCardExample,
  },
})
export default class Home extends Vue {
  value = ['黎明-01', '黎明-02'];

  treeData: any[] = [
    {
      title: '四大天王',
      key: 'root',
      children: [
        {
          title: '张学友',
          key: '张学友',
          children: [
            {
              key: '张学友-01',
              title: '张学友1',
            },
            {
              key: '张学友-02',
              title: '张学友2',
              children: [
                {
                  key: '张学友-02-01',
                  title: '张学友2-01',
                },
              ],
            }],
        },
        {
          title: '黎明',
          key: '黎明',
          children: [
            {
              title: '黎明1',
              key: '黎明-01',
            },
            {
              title: '黎明2',
              key: '黎明-02',
            },
          ],
          // scopedSlots: { title: 'title' },
        },
        {
          title: '刘德华',
          key: '刘德华',
          children: [{
            key: '刘德华-01',
            title: '刘德华1',
          }],
        },
        {
          title: '郭富城',
          key: '郭富城',
          children: [
            {
              key: '郭富城-01',
              title: '郭富城1',
            },
            {
              key: '郭富城-02',
              title: '郭富城2',
            }],
        },
      ],
    },
  ];

  dates = ['2021-01-03T08:51:22.384Z', '2021-02-25T08:51:22.384Z'];

  onShowTabsModal() {
    const { tabsModal }: any = this.$refs;
    if (tabsModal) {
      tabsModal.show();
    }
  }
}
</script>
