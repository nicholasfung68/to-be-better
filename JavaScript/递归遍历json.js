const o = require('./test.json')

// 递归遍历json
const myFn = (obj) => {
  if (!obj instanceof Object) return
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      myFn(obj[key])
    } else if (obj[key] instanceof Array) {
      for (const item of obj[key]) {
        myFn(item)
      }
    } else {
      console.log(`${key}:${obj[key]}`)
    }
  }
}

myFn(o)
