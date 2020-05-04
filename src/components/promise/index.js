/**
 * 异步实现
 */
const resolvePromise = (promise2, x, resolve, reject) => {
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if(called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called)return;
          called = true;
          reject(err);
        })
      } else {
        // if(called)return;
        // called = true;
        resolve(x);
      }
    } catch (e) {
      if(called)return;
      called = true;
      reject(e); 
    }
  } else {
    resolve(x);
  }
}

const MicrotaskFun = (someThings) => {
  window.addEventListener('message', _=>{
    someThings();
  });
  window.postMessage('');
}

class MyPromise {
  static PENDING = 'pending';
  static RESOLVED = 'resolved';
  static REJECTED = 'rejected';

  constructor (executor) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.reason = null;

    this.resolvedQueues = [];
    this.rejectedQueues = [];

    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver undefined is not a function');
    }

    let resolve = value => {
      if (this.status == MyPromise.PENDING) {
        // console.log('---this.resolvedQueues---', this.resolvedQueues);
        this.value = value;
        this.status = MyPromise.RESOLVED;
        this.resolvedQueues.forEach(cb => cb(this.value))
      }
    }

    let reject = reason => {
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

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason}

    // 第二步 加上 return this
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.RESOLVED) {
        // MicrotaskFun();
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        });
      }
  
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        });
      }

      if (this.status === MyPromise.PENDING) {
        this.resolvedQueues.push((value) => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
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
}

// 执行测试用例需要用到的代码
MyPromise.deferred = function() {
  let defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
  });
  return defer;
}

module.exports = MyPromise;
// export default MyPromise;
