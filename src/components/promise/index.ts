interface executor {
  (resolved: Resolved, rejected: Rejected): void;
}

interface Resolved {
  (value: any): void;
}

interface Rejected {
  (error: any): void;
}

// --------1--------
// class MyPromise {
//   private value: any; // primise 成功的值
//   private reason: any; // primise 失败的原因

//   private onFulfilled: Resolved | null; //成功的回调函数
//   private onRejected: Rejected | null; //失败的回调函数

//   constructor (executor: executor) {
//     this.value = null;
//     this.reason = null;
//     this.onFulfilled = null;
//     this.onRejected = null;

//     if (typeof executor !== 'function') {
//       throw new TypeError('Promise resolver undefined is not a function');
//     }

//     // 将 Promise 值赋值给 this.value，并执行成功后的注册任务
//     let resolve = (value: any): void => {
//       setTimeout(() => {
//         this.value = value;
//         this.onFulfilled && this.onFulfilled(this.value);
//       }, 0);
//     }

//     // 将 Promise 值赋值给 this.value，并执行失败后的注册任务
//     let reject = (reason: any): void => {
//       setTimeout(() => {
//         this.reason = reason;
//         this.onRejected && this.onRejected(this.reason);
//       }, 0);
//     }

//     try {
//       executor(resolve, reject);
//     } catch(err) {
//       reject(err);
//     }
//   }

//   private then (onFulfilled: Resolved, onRejected: Rejected) {
//     this.onFulfilled = onFulfilled;
//     this.onRejected = onRejected;
//   }
// }

// --------2--------
// class MyPromise {
//   private status: string; // promise 的状态
//   private value: any; // primise 成功的值
//   private reason: any; // primise 失败的原因

//   private resolvedQueues: Resolved[]; // promise 成功回调
//   private rejectedQueues: Rejected[]; // promise 失败回调


//   private static PENDING = 'pending';
//   private static RESOLVED = 'resolved';
//   private static REJECTED = 'rejected';

//   constructor (executor: executor) {
//     this.status = MyPromise.PENDING;
//     this.value = null;
//     this.reason = null;

//     this.resolvedQueues = [];
//     this.rejectedQueues = [];

        // if (typeof executor !== 'function') {
        //   throw new TypeError('Promise resolver undefined is not a function');
        // }

//     let resolve = (value: any): void => {
//       if (this.status == MyPromise.PENDING) {
//         this.value = value;
//         this.status = MyPromise.RESOLVED;
//         this.resolvedQueues.forEach(cb => cb(this.value))
//       }
//     }

//     let reject = (reason: any): void => {
//       if (this.status == MyPromise.PENDING) {
//         this.reason = reason;
//         this.status = MyPromise.REJECTED;
//         this.rejectedQueues.forEach(cb => cb(this.reason))
//       }
//     }

//     try {
//       executor(resolve, reject);
//     } catch(err) {
//       reject(err);
//     }
//   }

//   private then(onFulfilled: Resolved, onRejected: Rejected) {
//     onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
//     onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason}

//     if (this.status === MyPromise.PENDING) {
//       this.resolvedQueues.push(onFulfilled)
//       this.rejectedQueues.push(onRejected)
//     }

//     if (this.status === MyPromise.RESOLVED) {
//       onFulfilled(this.value)
//     }
//     if (this.status === MyPromise.REJECTED) {
//       onRejected(this.reason)
//     }
//     return this;
//   }
// }


// --------3--------
/**
 * 异步实现
 */
// const resolvePromise = (promise2: any, x: any, resolve: Resolved, reject: Rejected) => {
//   if (x instanceof MyPromise) {
//     const then = x.then;
//     if (x.status == MyPromise.PENDING) {
//       then.call(x, y => {
//         resolvePromise(promise2, y, resolve, reject);
//       }, err => {
//         reject(err);
//       })
//     } else {
//       x.then(resolve, reject);
//     }
//   } else {
//     resolve(x);
//   }
// }

// class MyPromise {
//   private status: string; // promise 的状态
//   private value: any; // primise 成功的值
//   private reason: any; // primise 失败的原因

//   private resolvedQueues: Resolved[]; // promise 成功回调
//   private rejectedQueues: Rejected[]; // promise 失败回调


//   private static PENDING = 'pending';
//   private static RESOLVED = 'resolved';
//   private static REJECTED = 'rejected';

//   constructor (executor: executor) {
//     this.status = MyPromise.PENDING;
//     this.value = null;
//     this.reason = null;

//     this.resolvedQueues = [];
//     this.rejectedQueues = [];

//     if (typeof executor !== 'function') {
//       throw new TypeError('Promise resolver undefined is not a function');
//     }

//     let resolve = (value: any): void => {
//       if (this.status == MyPromise.PENDING) {
//         this.value = value;
//         this.status = MyPromise.RESOLVED;
//         this.resolvedQueues.forEach(cb => cb(this.value))
//       }
//     }

//     let reject = (reason: any): void => {
//       if (this.status == MyPromise.PENDING) {
//         this.reason = reason;
//         this.status = MyPromise.REJECTED;
//         this.rejectedQueues.forEach(cb => cb(this.reason))
//       }
//     }

//     try {
//       executor(resolve, reject);
//     } catch(err) {
//       reject(err);
//     }
//   }

//   private then (onFulfilled: Resolved, onRejected: Rejected) {
//     onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
//     onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason}

//     // 第二步 加上 return this
//     const promise2 = new MyPromise((resolve, reject) => {
//       if (this.status === MyPromise.RESOLVED) {
//         let x = onFulfilled(this.value);
//         resolvePromise(promise2, x, resolve, reject!);
//       }
  
//       if (this.status === MyPromise.REJECTED) {
//         let x = onRejected(this.reason)
//         resolvePromise(promise2, x, resolve, reject!);
//       }

//       if (this.status === MyPromise.PENDING) {
//         this.resolvedQueues.push((value) => {
//           let x = onFulfilled(value);
//           resolvePromise(promise2, x, resolve, reject!);
//         })
//         this.rejectedQueues.push((reason) => {
//           let x = onRejected(reason);
//           resolvePromise(promise2, x, resolve, reject!);
//         })
//       }
//     });

//     return promise2;
//   }
// }

// --------4--------
/**
 * 规范版
 */
const resolvePromise = (promise2: any, x: any, resolve: Resolved, reject: Rejected) => {
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y: any) => {
          resolvePromise(promise2, y, resolve, reject);
        }, (err: any) => {
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e); 
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  private status: string; // promise 的状态
  private value: any; // primise 成功的值
  private reason: any; // primise 失败的原因

  private resolvedQueues: Resolved[]; // promise 成功回调
  private rejectedQueues: Rejected[]; // promise 失败回调


  private static PENDING = 'pending';
  private static RESOLVED = 'resolved';
  private static REJECTED = 'rejected';

  constructor (executor: executor) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.reason = null;

    this.resolvedQueues = [];
    this.rejectedQueues = [];

    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver undefined is not a function');
    }

    let resolve = (value: any): void => {
      if (this.status == MyPromise.PENDING) {
        this.value = value;
        this.status = MyPromise.RESOLVED;
        this.resolvedQueues.forEach(cb => cb(this.value))
      }
    }

    let reject = (reason: any): void => {
      if (this.status == MyPromise.PENDING) {
        this.reason = reason;
        this.status = MyPromise.REJECTED;
        this.rejectedQueues.forEach(cb => cb(this.reason))
      }
    }

    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }

  private then (onFulfilled: Resolved | null, onRejected: Rejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason}

    // console.log('---then---', this.status);

    // 第二步 加上 return this
    const promise2 = new MyPromise((resolve, reject) => {
      // console.log('-----this----', this)
      if (this.status === MyPromise.RESOLVED) {
        // window.addEventListener('message', event => {
        //   // console.log('---123321---');
        //   const { type, data } =  event.data;

        //   if (type === '__promise') {
        //     try {
        //       let x = onFulfilled(that.value);
        //       resolvePromise(promise2, x, resolve, reject);
        //     } catch(err) {
        //       reject(err);
        //     }
        //   }
        // });
        // window.postMessage({
        //   type: '__promise',
        // }, "http://localhost:3001");
        setTimeout(() => {
          try {
            let x = onFulfilled && onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        })
      }
  
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        })
      }

      if (this.status === MyPromise.PENDING) {
        this.resolvedQueues.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled && onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch(err) {
              reject(err);
            }
          });
        })
        this.rejectedQueues.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject);
            } catch(err) {
              reject(err);
            }
          });
        })
      }
    });

    return promise2;
  }

  private catch(onRejected: Rejected) {
    return this.then(null, onRejected);
  }

  private finally (fn: Resolved) {
    return this.then(fn, fn);
  }

  static resolve = (val: any) => {
    return new MyPromise((resolve,reject)=>{
      resolve(val)
    });
  }

  static reject = (val: any) => {
    return new MyPromise((resolve,reject)=>{
      reject(val)
    });
  }

  static all = function(promises: MyPromise[]) {
    return new MyPromise((resolve, reject) => {
        let result: MyPromise[] = [];
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((data) => {
                result[i] = data;
                if (++count == promises.length) {
                    resolve(result);
                }
            }, function(error) {
                reject(error);
            });
        }
    });
  }

  static race = (promises: MyPromise[]) => {
    return new MyPromise((resolve,reject) => {
      for(let i = 0; i < promises.length; i++){
        promises[i].then(resolve,reject)
      };
    })
  }

  static allSettled = (promises: MyPromise[]) => {
    return new MyPromise((resolve) => {
        let result: MyPromise[] = [];
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
          promises[i].finally(res => {
            result[i] = res;
            if (++count == promises.length) {
              resolve(result);
            }
          })
        }
    });
  }
}

export default MyPromise;
