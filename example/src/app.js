import { MyPromise } from '../../src/index';

var p1 = new MyPromise((resolved, rejected) => {
  // let num = Math.random();

  // console.log('----num---', num);

  // if(num < .5){
  //   resolved(num)
  // } else {
  //   rejected('失败')
  // }
  // setTimeout(() => {
    resolved('-----我 resolved 了-----');
  // }, 1000)
  
})

// 例子0：最简单的一个实现
p1.then((res) => {
  console.log('----res1----', res);
  return `${res}-then 中 return`;
}, err => {
  console.log('----err1----', err)
})

// var p1 = new MyPromise((resolved, rejected) => {
//   // setTimeout(() => {
//     // console.log('----执行了1---');
//     resolved('---p1---');
//   // }, 400); 
// })

// 例子一：不支持链式调用

// p1.then((data) => {
//   console.log('---data1', data);
//   return '----p2-----';
// })

// 例子二：支持链式调用

// p1.then((data) => {
//   console.log('---data2', data);
//   return '----p2-----';
// }).then((data) => {
//   console.log('---data3', data);
//   return '----p3-----';
// }).then((data) => {
//   console.log('---data4', data);
//   return '----p4-----';
// });

// p1.then((data) => {
//   console.log('---data2', data);
//   // setTimeout(() => {
//     return '----p2-----';
//   // }, 400); 
// }).then((data) => {
//   console.log('---data3', data);
//   // setTimeout(() => {
//     return '----p3-----';
//   // }, 400);
// }).then((data) => {
//   console.log('---data4', data);
//   // setTimeout(() => {
//     return '----p4-----';
//   // }, 400);
// });

// 例子4：最简单的一个实现
// p1.then((res) => {
//   console.log('----res1----', res);
//   return `${res}-then 中 return`;
// }, err => {
//   console.log('----err1----', err)
// }).then((res) => {
//   console.log('----res2----', res);
//   return `${res}-then 中 return`;
// }, err => {
//   console.log('----err2----', err)
// })


