interface executor {
  (resolved: Resolved, rejected?: Rejected): void;
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
//   }
// }


// --------3--------
/**
 * 基础版
 */
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

//     let resolve = (value: any): void => {
//       if (this.status == MyPromise.PENDING) {
//         console.log('----resolvedQueues---', this.resolvedQueues);
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
//     console.log('-----123----');
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

//     // 第二步 加上 return this
//     return this;
//   }
// }

// --------4--------
/**
 * 最终版
 */
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

  private then (onFulfilled: Resolved, onRejected: Rejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason}

    // if (this.status === MyPromise.PENDING) {
    //   this.resolvedQueues.push(onFulfilled)
    //   this.rejectedQueues.push(onRejected)
    // }

    // if (this.status === MyPromise.RESOLVED) {
    //   onFulfilled(this.value)
    // }
    // if (this.status === MyPromise.REJECTED) {
    //   onRejected(this.reason)
    // }

    return new MyPromise((resolved, rejected) => {
      // 成功
      if (this.status === MyPromise.RESOLVED) {
        setTimeout(() => {
          let x = onFulfilled(this.value);
          resolved && resolved(x);
        }, 0);
      }

      // 失败
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.reason);
          rejected && rejected(x);
        }, 0);
      }

      if (this.status === MyPromise.PENDING) {
        this.resolvedQueues.push(() => {
          setTimeout(() => {
            let x = onFulfilled(this.value);
            resolved && resolved(x);
          }, 0);
        });
        this.rejectedQueues.push(() => {
          setTimeout(() => {
            let x = onRejected(this.reason);
            rejected && rejected(x);
          }, 0);
        });
      }
    });
  }
}


export default MyPromise;