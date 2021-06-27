// 请分别用深度优先思想和广度优先思想实现一个拷贝函数。
// 目前实现深拷贝Object、Array，其他的非基本类型都是浅拷贝，题目用意应该主要是考察遍历树以及重复引用。
// DFS使用常规的递归问题不大，需要注意的是重复引用导致爆栈的问题，不使用递归的话使用栈

const getEmpty = (o) => { // 需要处理其他类型的在这个方法里面加对应的判断
  if (Object.prototype.toString.call(o) === '[object Object]') {
    return {}
  }
  if (Object.prototype.toString.call(o) === '[object Array]') {
    return []
  }
  return o
}

const deepCopyDFS = (origin) => {
  const stack = []
  const map = new Map() // 记录出现过的对象，用于处理环（重复、循环引用）
  const target = getEmpty(origin)
  if (target !== origin) {
    stack.push([origin, target])
    map.set(origin, target)
  }
  while(stack.length) {
    const [ori, tar] = stack.pop()
    for (const key in ori) {
      if (map.get(ori[key])) { // 处理环
        tar[key] = map.get(ori[key])
        continue
      }
      tar[key] = getEmpty(ori[key])
      if (tar[key] !== ori[key]) {
        stack.push([ori[key], tar[key]])
      }
    }
  }
  return target
}

const deepCopyBFS = (origin) => {
  const queue = []
  const map = new Map()
  const target = getEmpty(origin)
  if (target !== origin) {
    queue.push([origin, target])
    map.set(origin, target)
  }
  while (queue.length) {
    const [ori, tar] = queue.shift()
    for (const key in ori) {
      if (map.get(ori[key])) {
        tar[key] = map.get(ori[key])
        continue
      }
      tar[key] = getEmpty(ori[key])
      if (tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]])
        map.set(ori[key], tar[key])
      }
    }
  }
  return target
}

// 简易版（引用类型只考虑Object、Array，使用WeakMap解决爆栈问题）
const deepClone = (source, hash = new WeakMap()) => {
  if (hash.has(source)) {
    return hash.get(source)
  }
  const obj = Array.isArray(source) ? [] : {}
  hash.set(source, obj)
  for (const key in source) {
    obj[key] = Object.prototype.toString.call(source[key]) === '[object Object]'
      ? deepClone(source[key], hash)
      : source[key]
  }
  return obj
}

// test
const o = { m: 2 }
const obj = {
  a: { b: o },
  e: o
}

console.log(o)
console.log(obj)
console.log(111, deepClone(obj))
o.n = 'nicholas'
console.log(obj)
console.log(222, deepClone(obj))
