// const obj = {}
// Object.defineProperty(obj, 'name', {
//   value: 'Nicholas', // 属性的值
//   writable: true, // 是否可写
//   enumerable: true, // 是否能够通过 for in 枚举
//   configurable: true // 是否可使用delete删除
// })
// console.log(`Hi, 怎么是你 ${obj?.name}`)


// JS利用 Object.defineProperty 实现一个简易MVVM，监测一个普通对象的数据变化
// 参考资料 http://hcysun.me/2016/04/28/JavaScript%E5%AE%9E%E7%8E%B0MVVM%E4%B9%8B%E6%88%91%E5%B0%B1%E6%98%AF%E6%83%B3%E7%9B%91%E6%B5%8B%E4%B8%80%E4%B8%AA%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%8F%98%E5%8C%96/

const ObjectPrototype = Object.prototype // Object原型
const OverrideArrayMethod = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reduce'] // 需要重写的数组方法

class Observe {
  constructor(obj, callback) {
    if (ObjectPrototype.toString.call(obj) !== '[object Object]') {
      console.error(`This parameter must an object: ${obj}`)
    }
    this.$callback = callback
    this.observe(obj)
  }

  observe(obj, path) {
    // 检测是不是数组，是数组走另外一个监测逻辑
    if (ObjectPrototype.toString.call(obj) === '[object Array]') {
      this.overrideArrayProto(obj, path)
    }
    Object.keys(obj).forEach(function(key) {
      let oldVal = obj[key]
      let pathArray = path && path.slice(0)
      if (pathArray) {
        pathArray.push(key)
      } else {
        pathArray = [key]
      }

      Object.defineProperty(obj, key, {
        get: function() {
          return oldVal
        },
        set: (function(newVal) {
          if (oldVal !== newVal) {
            if (ObjectPrototype.toString.call(newVal) === '[object Object]' || ObjectPrototype.toString.call(newVal) === '[object Array]') {
              this.observe(newVal, pathArray)
            }
            this.$callback(newVal, oldVal, pathArray)
            oldVal = newVal
          }
        }).bind(this)
      })

      if (ObjectPrototype.toString.call(obj[key]) === '[object Object]' || ObjectPrototype.toString.call(obj[key]) === '[object Array]') {
        this.observe(obj[key], pathArray)
      }
    }, this)
  }

  overrideArrayProto(array, path) {
    const originalProto = Array.prototype
    const overrideProto = Object.create(Array.prototype)
    const self = this
    let result

    Object.keys(OverrideArrayMethod).forEach(function(_, index, __) {
      const method = OverrideArrayMethod[index]
      let oldArray = []

      Object.defineProperty(overrideProto, method, {
        value: function() {
          oldArray = this.slice(0)

          const arg = [].slice.apply(arguments) // 等同于 const arg = Array.prototype.slice.call(arguments)
          result = originalProto[method].apply(this, arg) // 调用原始原型的数组方法

          self.observe(this, path) // 对新的数组进行监测
          self.$callback(this, oldArray, path) // 执行回调

          return result
        },
        writable: true,
        enumerable: false,
        configurable: true
      })
    }, this)

    // 最后让该数组实例的 __ptoto__ 属性指向 假的原型 overrideProto
    array.__proto__ = overrideProto
  }
}


// --- 手动分割线， 测试是否能用 ---

// 定义通知回调
const callback = (newVal, oldVal, path) => {
  console.log('newVal: ' + newVal, '\noldVal: ' + oldVal, '\npath: ' + path, '\n------deviding line------')
}

// 定义一个普通对象作为数据模型
const data = {
  a: 200,
  level1: {
    b: 'str',
    c: [1, 2, 3],
    level2: {
      d: 35
    }
  }
}

// 实例化一个监测对象，去监测数据，并在数据发生改变时作出反应
const observeInstance = new Observe(data, callback)

data.a = 10010
data.level1.b = 'Nicholas'
data.level1.c.push(4)
data.level1.level2.d = 45
data.level1.c.push({ cc: '饮茶先啦' })
