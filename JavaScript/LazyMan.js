/**
 * 实现一个LazyMan，可以按照以下方式调用：
 * 
 * LazyMan("Hank")
 * // 输出：
 * Hi!Thhis is Hank!
 * LazyMan("Hank").sleep(10).eat("dinner")
 * // 输出
 * Hi! This is Hank!
 * // 等待10秒...
 * Wake up after 10
 * Eat dinner~
 * LazyMan("Hank").eat("dinner").eat("supper")
 * // 输出
 * Hi! This is Handk！
 * Eat dinner~
 * Eat supper~
 * LazyMan("Hank").sleepFirst(5).eat("supper")
 * // 输出
 * // 等待5秒...
 * Wake up after 5
 * Hi! This is Hank!
 * Eat supper
 * 
 * 以此类推
 */

class _LazyMan {
  constructor(name) {
    this.queue = []
    this.timer = null
    this.sayHi(name)
  }

  run() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(async () => {
      for (const asyncFn of this.queue) { // 依次执行
        await asyncFn()
      }
      this.queue.splice(0) // 执行完队列里的任务后清空任务列表
      this.timer = null // 执行完之后timer置空
    })
    return this
  }

  sayHi(name) {
    this.queue.push(async () => console.log(`Hi! This is ${name}!`))
    return this.run()
  }

  eat(food) {
    this.queue.push(async () => console.log(`Eat ${food}~`))
    return this.run()
  }

  sleep(second) {
    this.queue.push(async () => {
      console.log(`Wake up after ${second}`)
      return this.timeout(second)
    })
    return this.run()
  }

  sleepFirst(second) {
    this.queue.push(async () => {
      console.log(`Wake up after ${second}`)
      return this.timeout(second)
    })
    return this.run()
  }

  async timeout(second) {
    await new Promise(resolve => {
      setTimeout(resolve, second * 1000)
    })
  }
}

// test
const LazyMan = (name) => new _LazyMan(name)


// LazyMan('Hank')
// 输出：
// Hi!Thhis is Hank!


// LazyMan('Hank').sleep(10).eat('dinner')
// 输出
// Hi! This is Hank!
// 等待10秒...
// Wake up after 10
// Eat dinner~


// LazyMan('Hank').eat('dinner').eat('supper')
// 输出
// Hi! This is Handk！
// Eat dinner~
// Eat supper~


LazyMan('Hank').sleepFirst(5).eat('supper')
// 输出
// 等待5秒...
// Wake up after 5
// Hi! This is Hank!
// Eat supper
