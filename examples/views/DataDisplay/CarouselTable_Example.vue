/**
* @描述: CarouselTable_Example
* @作者: 张俊
* @创建时间: 2022-03-04 11:20:58
*/
<template>
  <carousel-table style="width: 50vw;height: 50vh;"
                  :bodyStyle="{height:'400px'}"
                  :dataSource="data"
                  :autoplay="true"
                  :columns="columns">
<!--    <h1 slot="name" slot-scope="{text}">-->
<!--      {{ text }}-->
<!--    </h1>-->
  </carousel-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'CarouselTableExample' })
export default class CarouselTableExample extends Vue {
  columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'title',
      width: '40%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      scopedSlots: { customRender: 'tags' },
    },
  ];

  data = [
    {
      key: '1',
      name: 'John Brownsdcsdcsdcsdcsdcsdcsdcsdcsdcsdcsdcsdcdsc',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Parkeververvevervethtyjtththtyhtyhtyhtyhtyhty',
      tags: ['cool', 'teacher'],
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
}
</script>

<style scoped lang="less">

</style>
