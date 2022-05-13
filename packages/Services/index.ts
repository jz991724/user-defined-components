import moment from 'moment';

/** 行合并
 * @author 张俊
 * @date 2022/4/21 10:05
 * @param dataSource：源数据
 * @param mergerFields：需要判断的字段名称集合
 * @param row：当前行的值
 * @return 最后得到“{1:3,20:2}”类型的数据（key代表的是开始合并的索引，后面的value是要合并的行数，其中value为0时就是被前面的合并掉了）
 */
export function customRenderMergerRow(dataSource, mergerFields, row) {
  // 当前行数据里面mergerFields里面这些字段的值都是否相同判断的函数方法
  const matchFunc = (record) => {
    if (record) {
      const temp = mergerFields.map((field) => `${record[field] == row[field]}`);
      return !temp.includes('false');
    }
    return false;
  };

  // 获取源数据里面所有满足可以合并行的条件的行的索引的函数方法
  const findMatchIndexArray = (allRecord = []) => {
    const allIndex = [];
    allRecord.forEach((record, index) => {
      if (matchFunc(record)) {
        allIndex.push(index);
      }
    });

    return allIndex;
  };

  // 下面这些都是为了将上面获取的满足合并行条件的行索引，通过是否连续判断处理得到哪些行可以合并到一起
  const mergerRowDic = {};
  let mergerRowGroup = [];

  // 获取源数据里面所有满足可以合并行的条件的行的索引
  const allMatchRecordIndexArray = findMatchIndexArray(dataSource);
  // 临时存储连续的索引，然后遇到不连续的时候添加到mergerRowGroup里面
  let group: Array<number> = [];
  // 循环满足可以合并行的条件的行的索引
  allMatchRecordIndexArray.forEach((currentValue, currentIndex) => {
    // 得到临时存储数组里面连续的索引最后添加的一个
    const preValue = group[group.length - 1];
    // 如果当前这个临时数组里面还没有连续的索引值（一般只有currentIndex===0时会进这个判断）
    if (group?.length < 1) {
      group = [currentValue];
    } else if (preValue + 1 === currentValue) { // 和上一个添加到临时数组里面的索引值相比较是连续的，就添加到这个临时数组里面
      group = [...group, currentValue];
    } else { // 如果和上一个添加到临时数组里面的索引值不是连续的
      // 将临时数组添加到mergerRowGroup里面
      mergerRowGroup = [...mergerRowGroup, group];

      // 重新赋值一个临时连续索引存储的数组，并从当前这个索引开始判断后面满足条件的索引是否和它连续重复上面的操作
      group = [currentValue];
    }

    // 如果循环到最后一行，直接将临时数组group添加到mergerRowGroup
    if (currentIndex === allMatchRecordIndexArray.length - 1) {
      mergerRowGroup = [...mergerRowGroup, group];
    }
  });

  // 上边处理得到类似“[[1,2,3],[7],[20,21],[50]]”这样的数据
  // 过滤掉不用合并的行剩下“[[1,2,3],[20,21]]”
  mergerRowGroup.filter((mergerBlock) => mergerBlock?.length > 1)
    .forEach((mergerBlock = []) => {
      mergerBlock.forEach((itemValue, i) => {
        // 如果是可以合并的行索引的第一个，就存一共要被合并的行数
        if (i === 0) {
          mergerRowDic[itemValue] = mergerBlock?.length || 0;
        } else { // 其他都存成0，因为要被合并掉
          mergerRowDic[itemValue] = 0;
        }
      });
    });

  // 最后得到“{1:3,20:2}”的数据（key代表的是开始合并的索引，后面的value是要合并的行数，其中value为0时就是被前面的合并掉了）
  return mergerRowDic;
}

/** 列合并
 * @author 张俊
 * @date 2022/4/21 10:05
 * @param mergerFields：需要判断的字段名称集合（可以合并的列的名称）
 * @param row：当前行的值
 * @return 最后得到类似这样的数据“{name:1,phone:2,tel:0,address:1}”这样的数据（key就是字段名称，value就是需要合并的列数，其中value值为0时就是被前面合并了）
 */
export function customRenderMergerCol(mergerFields, currentField, row) {
  const mergerColDic = {};
  // 目标字段默认是第一个字段名称
  let [targetField] = mergerFields;
  // 遍历所有需要合并时单元格数据相同的字段名称
  mergerFields.forEach((field, index) => {
    // 跳过不需要判断的字段名称（因为这个字段名称的单元格已经和前面的单元格合并了）
    if (targetField === field) {
      // 当前遍历的字段的值
      const currentFieldValue = row[field];
      // 如果当前字段的数据还没有被添加
      if (!mergerColDic[field]) {
        mergerColDic[targetField] = 1;
      }

      // 只循环当前索引后面的合并字段名称（这里是要统计判断和当前这个字段名称的单元格的值相同的需要合并的字段的单元格值有几个）
      // 目的就是找到和当前字段名称单元格值连续相同的单元格数量
      for (const fieldName of mergerFields.slice(index + 1, mergerFields.length)) {
        // 判断后面的字段名称的值和上面循环的值是否相同
        if (row[fieldName] == currentFieldValue) {
          mergerColDic[field] += 1;// 统计值加一
          mergerColDic[fieldName] = 0;// 后面的这个字段也只能设为0（因为它要被合并到前面和它单元格值相同的单元格）
        } else {
          // 停止这个循环，开始上边循环（要从现在停止的这个循环的这个字段名称开始，因为前面的字段通过判断单元格数据是相同的，
          // 所以他们是连续相同的可以合并，从这里开始不连续了，所以要从这个开始找和它单元格值连续的单元格，所以上面循环需要跳过这个字段名称的循环）
          targetField = fieldName;
          break;
        }
      }
    }
  });

  // 最后得到类似这样的数据“{name:1,phone:2,tel:0,address:1}”这样的数据（key就是字段名称，value就是需要合并的列数，其中value值为0时就是被前面合并了）
  return mergerColDic;
}

/** 行和列合并
 * @author 张俊
 * @date 2022/4/21 10:05
 * @param allRows：数据源（所有需要处理的数据记录）
 * @param rowMergerFields：需要判断这个字段名称集合里面这些字段全部相同才能合并行
 * @param colMergerFields：需要判断的字段名称集合（可以合并的列的名称,必须相邻）
 * @param value：当前单元格的值
 * @param row：当前行的数据
 * @param rowIndex：当前行的索引
 * @return 返回：满足Ant-Design的a-table的customRender格式的数据
 */
export function customRenderMerger(currentField, value, row, rowMergerParams: { allRows: any[], rowMergerFields: string[], rowIndex: number } = undefined, colMergerFields = []) {
  let rowSpan = 1;
  let colSpan = 1;

  if (rowMergerParams) {
    const {
      allRows,
      rowMergerFields,
      rowIndex,
    } = rowMergerParams;

    if (allRows?.length > 0 && rowMergerFields?.length > 0 && row && rowMergerFields.includes(currentField)) {
      const rowSpanDic = customRenderMergerRow(allRows, rowMergerFields, row);
      rowSpan = rowSpanDic[rowIndex];
    }
  }

  if (colMergerFields?.length > 0 && currentField && row) {
    const colSpanDic = customRenderMergerCol(colMergerFields, currentField, row);
    colSpan = colSpanDic[currentField];
  }

  return {
    children: value,
    style: {
      whiteSpace: '',
      fixed: 'left',
    },
    attrs: {
      rowSpan,
      colSpan,
    },
  };
}

/**
 * 在console显示package.json的信息
 * @author 张俊
 * @date 2022/5/13 9:18
 * @param 需要打印的数据
 * @return null
 */
export function copyRightConsole(packageInfo, packageDateTime = moment()
  .format('YYYY-MM-DD HH:mm:ss')) {
  /* 样式代码 */
  const projectNameStyle = 'font-size: 20px;font-weight: 600;color: rgb(244,167,89);';
  const descriptionStyle = 'font-style: oblique;font-size:14px;color: rgb(244,167,89);font-weight: 400;';
  const versionStyle = 'color: rgb(30,152,255);padding:8px 0 2px;';
  const contentStyle = 'color: rgb(30,152,255);padding:0 0 2px;';
  const dateTimeStyle = 'color: rgb(30,152,255);padding:0 0 5px;';

  /* 内容代码 */
  const {
    name,
    description,
    author,
    homepage,
    repository,
    dependencies,
  } = packageInfo;

  const projectName = name || '';
  const version = `版 本 号：${packageInfo.version}    【Ant Design Vue 版本：${dependencies?.['ant-design-vue'] || dependencies?.['ant-design-vue']}】`;
  const dateTime = `编译日期：${packageDateTime}`;

  const authorInfo = `作   者：${author}`;
  const homepageInfo = `主   页：${homepage}`;
  const repositoryInfo = `github地址：${repository?.url}`;

  // 空格有意义，不要格式化
  console.log(`%c${description} %c${projectName}
%c${version}
%c${authorInfo}
%c${homepageInfo}
%c${repositoryInfo}
%c${dateTime}`, projectNameStyle, descriptionStyle, versionStyle, contentStyle, contentStyle, contentStyle, dateTimeStyle);
}
