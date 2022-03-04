/**
* @描述: DescInfoCard_Example
* @作者: 张俊
* @创建时间: 2022-02-21 09:25:38
*/
<template>
<!--  <desc-info-card @click="onClickCard"-->
<!--                  :data-source="item"-->
<!--                  :cover-image-src="item.path"-->
<!--                  :loading="spinning"-->
<!--                  :desc-columns="descCardColumns">-->
<!--    <div slot-scope="{ncplx,yplx}" class="xf-text-medium xf-text-16 text-black-85 xf-margin-bottom">-->
<!--      {{ filterDictTextByCache('ncplx', ncplx) || (filterDictTextByCache('yplx', yplx) || '') }}-->
<!--    </div>-->

<!--    &lt;!&ndash;农产品安全性评价/土壤环境质量评价&ndash;&gt;-->
<!--    <div slot="yplx_label"-->
<!--         slot-scope="{dataSource:{yplx}}"-->
<!--         class="xf-text-12 xf-text-regular text-black-45 xf-padding-bottom-xs xf-text-inline">-->
<!--      {{ getTitle(yplx) }}-->
<!--    </div>-->
<!--    <div slot="yplx"-->
<!--         class="xf-text-12 xf-text-regular text-black text-cut"-->
<!--         v-html="getEvaluationHtml(item.yplx,item.pjjg)">-->
<!--    </div>-->
<!--  </desc-info-card>-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'DescInfoCardExample' })
export default class DescInfoCardExample extends Vue {

}
</script>

<style scoped lang="less">

</style>
