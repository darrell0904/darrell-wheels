/**
 * Pagination 分页器
 */

import { Pagination } from '../../src/index';
// import { Pagination } from 'darrell-wheels';

new Pagination('#pagination', {
  total: 500,
  // disabled: true,
  showLessItems: false,
  // size: 'small',
  // showTotal: (total, range) => {
  //   return `${range[0]}-${range[1]} of ${total} items`;
  // },
  showSizeChanger: false,
  showQuickJumper: true,
  hideOnSinglePage: false,
  simple: true,
  onChange: (page, pageSize) => {
    console.log('---page---', page);
    console.log('---pageSize---', pageSize);
  },
  onShowSizeChange: (page, size) => {
    console.log('---page--11-', page);
    console.log('---size--11-', size);
  },
  // itemRender: (current, type, originalElement) => {
  //   function createAEle (content) {
  //     let aEle = document.createElement("a");
  //     aEle.innerHTML = content;
  //     return aEle;
  //   }

  //   if (type === 'prev') {
  //     return createAEle('上一个');
  //   }

  //   if (type === 'next') {
  //     return createAEle('下一个');
  //   }

  //   if (type === 'page') {
  //     return createAEle(`第${current}只`);
  //   }

  //   return originalElement;
  // }
});

/**
 * Promise demo
 */

import { MyPromise } from '../../src/index';

