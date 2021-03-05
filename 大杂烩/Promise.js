// // 问题1
// // 解释：Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。
// const promise = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve()
//   console.log(2)
// })
// promise.then(() => {
//   console.log(3)
// })
// console.log(4)
// // 运行结果： 
// // 1
// // 2
// // 4
// // 3


// // 题目2
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// })
// const promise2 =  promise1.then(() => {
//   throw new Error('error!')
// })
// console.log('promise1 =>', promise1)
// console.log('promise2 =>', promise2)
// setTimeout(() => {
//   console.log('setTimeout promise1 =>', promise1)
//   console.log('setTimeout promise2 =>', promise2)
// }, 2000)
// // 解释：promise 有 3 种状态：pending、fulfilled 或 rejected。
// // 状态改变只能是 pending->fulfilled 或者 pending->rejected，
// // 状态一旦改变则不能再变。下面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。


// // 题目3
// const promise = new Promise((resolve, reject) => {
//   resolve('success1')
//   reject('error')
//   resolve('success2')
// })

// promise
//   .then((res) => {
//     console.log('then =>', res)
//   })
//   .catch((err) => {
//     console.log('carch =>', err)
//   })
// // 打印结果：
// // then => success1
// // 解释：
// // 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，
// // 呼应题目2结论：promise 状态一旦改变则不能再变。


// // 题目4
// Promise.resolve(1)
//   .then((r) => {
//     console.log('r:', r)
//     return 2
//   })
//   .catch(() => {
//     return 3
//   })
//   .then((res) => {
//     console.log('res:', res)
//   })

// // 执行结果：
// // r: 1
// // res: 2
// // 解释：
// // promise可以链式调用。提起链式调用我们通常会想到return this实现，
// // 不过Promise并不是这样实现的。promise每次调用 then 或者catch 都会返回
// // 一个新的promise，从而实现了链式调用。


// // 题目5
// const promise = new Promise((reslove, reject) => {
//   setTimeout(() => {
//     console.log('once')
//     reslove('success')
//   }, 1000)
// })
// const start = Date.now()
// promise.then((res) => {
//   console.log(res, Date.now() - start)
// })
// promise.then((res) => {
//   console.log(res, Date.now() - start)
// })
// // 解释：
// // promise 的 .then 或者 .catch 可以被调用多次，
// // 但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，
// // 并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。



// // 题目6
// Promise.resolve()
//   .then(() => {
//     return new  Error('error!!!')
//   })
//   .then((res) => {
//     console.log('then: ', res)
//   })
//   .catch((err) => {
//     console.log('catch: ', err)
//   })
// // 解释：.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种：
// // return Promise.reject(new Error('error!!!'))
// // throw new Error('error!!!')
// // 因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。


// // 题目7
// const promise = Promise.resolve()
//   .then(() => {
//     return promise
//   })
// promise.catch(console.error)
// // 解释：.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。类似于：
// // process.nextTick(function tick () {
// //   console.log('tick')
// //   process.nextTick(tick)
// // })


// // 题目8
// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .then(console.log)
// // 运行结果 1
// // 解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。


// 题目9
// Promise.resolve()
//   .then(function success (res) {
//     throw new Error('error')
//   }, function fail1 (e) {
//     console.error('fail1: ', e)
//   })
//   .catch(function fail2 (e) {
//     console.error('fail2: ', e)
//   })
// // 解释：.then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。
// // .catch 是 .then 第二个参数的简便写法，但是它们用法上有一点需要注意：
// // .then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，
// // 而后续的 .catch 可以捕获之前的错误。当然以下代码也可以：
// Promise.resolve()
//   .then(function success1 (res) {
//     throw new Error('error')
//   }, function fail1 (e) {
//     console.error('fail1: ', e)
//   })
//   .then(function success2 (res) {
//   }, function fail2 (e) {
//     console.error('fail2: ', e)
//   })


// 题目10
process.nextTick(() => {
  console.log('nextTrick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
// 运行结果：
// end
// nextTrick
// then
// setImmediate

// 解释：process.nextTick 和 promise.then 都属于 microtask，
// 而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。
// 事件循环的每个阶段（macrotask）之间都会执行 microtask，
// 事件循环的开始会先执行一次 microtask。
