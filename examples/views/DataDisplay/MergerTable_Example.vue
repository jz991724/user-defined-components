/**
* @描述: MergerTable_Example 表行/列合并
* @作者: 张俊
* @创建时间: 2022-04-20 16:55:24
*/
<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  customRenderMerger,
} from '../../../packages/Services';

@Component({ name: 'MergerTableExample' })
export default class MergerTableExample extends Vue {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      customRender:
        (value, row, index) => customRenderMerger(
          'name', value, row,
          {
            allRows: this.dataSource,
            rowMergerFields: ['name'],
            rowIndex: index,
          },
          ['tel', 'phone'],
        ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      customRender:
        (value, row, index) => customRenderMerger(
          'age', value, row,
          {
            allRows: this.dataSource,
            rowMergerFields: ['name', 'age'],
            rowIndex: index,
          },
          ['tel', 'phone'],
        ),
    },
    {
      title: 'Home phone',
      colSpan: 2,
      dataIndex: 'tel',
      customRender:
        (value, row, index) => customRenderMerger(
          'tel', value, row,
          {
            allRows: this.dataSource,
            rowMergerFields: ['name'],
            rowIndex: index,
          },
          ['tel', 'phone'],
        ),
    },
    {
      title: 'Phone',
      colSpan: 0,
      dataIndex: 'phone',
      customRender:
        (value, row, index) => customRenderMerger(
          'phone', value, row,
          {
            allRows: this.dataSource,
            rowMergerFields: ['name'],
            rowIndex: index,
          },
          ['tel', 'phone'],
        ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  dataSource = [
    {
      key: '1',
      name: '樱木花道',
      age: 42,
      tel: 18889898989,
      phone: 18889898989,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '2',
      name: '樱木花道',
      age: 42,
      tel: '0571-22098333',
      phone: 18889898888,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '3',
      name: '樱木花道',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: '赤木刚宪',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '5',
      name: '樱木花道',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
    {
      key: '6',
      name: '宫城良田',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
    {
      key: '7',
      name: '樱木花道',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
    {
      key: '8',
      name: '樱木花道',
      age: 'k',
      tel: 'k',
      phone: '3',
      address: 'k',
    },
  ];
}
</script>

<style scoped lang="less">

</style>
