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
    resolved('resolved');
  // }, 0)
})

// p1.then(res => {
//   console.log('---then---');
// })

// // // 例子0：最简单的一个实现
// p1.then((res) => {
//   console.log('----res1----', res);
//   return new MyPromise((resolved, rejected) => {
//     // setTimeout(() => {
//       resolved('then1');
//     // }, 1000)
//   });

//   // return {
//   //   then: function(resolve, reject) {
//   //     setTimeout(() => {
//   //       resolve('then1');
//   //     }, 1000)
//   //   }
//   // };
// })
// .then((res) => {
//   console.log('----res2----', res);
//   return new MyPromise((resolved, rejected) => {
//     setTimeout(() => {
//       resolved('then2');
//     }, 1000)
//   });
// })
// .then((res) => {
//   console.log('----res3----', res);
//   return 'then3';
// })

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



// catch
// p1.then((res) => {
//   // console.log('----res1----', res);
//   return new MyPromise((resolved, rejected) => {
//     setTimeout(() => {
//       rejected('错误了');
//     }, 1000)
//   });
// })
// .then((res) => {
//   console.log('----res2----', res);
//   return new MyPromise((resolved, rejected) => {
//     setTimeout(() => {
//       resolved('then2');
//     }, 1000)
//   });
// })
// .then((res) => {
//   console.log('----res3----', res);
//   return 'then3';
// }).catch(error => {
//   console.log('----error', error);
// })

// finally
// p1.then((res) => {
//   return new MyPromise((resolved, rejected) => {
//     setTimeout(() => {
//       rejected('错误了');
//       // resolved('成功了');
//     }, 1000)
//   });
// })
// .then((res) => {
//   console.log('----res2----', res);
//   return new MyPromise((resolved, rejected) => {
//     setTimeout(() => {
//       resolved('then2');
//     }, 1000)
//   });
// })
// .then((res) => {
//   console.log('----res3----', res);
//   return 'then3';
// }).catch(error => {
//   console.log('---error', error);
//   return `catch-${error}`
// }).finally(res => {
//   console.log('---finally---', res);
// })

// MyPromise.resolve({name: 'darrell', sex: 'boy' }).then((res) => {
//   console.log(res);
// }).catch((error) => {
//   console.log(error);
// });

// MyPromise.reject("出错了").then((res) => {
//   console.log(res);
// }).catch((error) => {
//   console.log(error);
// });

// all
let Promise2 = new MyPromise((resolve, reject) => {
  resolve('Promise2');
});

let Promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise1');
  }, 2000);
});

let Promise3 = new MyPromise((resolve, reject) => {
  resolve('Promise3');
})

let Promise4 = new MyPromise((resolve, reject) => {
  reject('Promise4');
})

// let p = MyPromise.all([Promise1, Promise2, Promise3, Promise4])
// let p = MyPromise.race([Promise1, Promise2, Promise3, Promise4])
let p = MyPromise.allSettled([Promise1, Promise2, Promise3, Promise4])

p.then((res) => {
  // 三个都成功则成功  
  console.log('---成功了', res);
}, err => {
  // 只要有失败，则失败 
  console.log('---失败了', err);
})