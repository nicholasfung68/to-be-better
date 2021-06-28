// 扁平化数组，意思是将多维数组转化成一维数组， 例如 [1, [2, 3, [4, 5]]] 扁平化之后得到 [1, 2, 3, 4, 5]

const flattenArray = (arr) => {
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    return new Error(`The input: "${arr}" must be an array!`)
  }

  // 方式1
  // let result = []
  // for (let i = 0; i < arr.length; i += 1) {
  //   const temp = Array.isArray(arr[i]) ? flattenArray(arr[i]) : arr[i]
  //   result = result.concat(temp)
  // }
  // return result

  // 方式2：使用some实现
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }

  return arr

  // 方式3：使用ES6的flat函数，需要考虑的是兼容性问题
  // return arr.flat(Infinity)
}

// 变形：在实现数组扁平化的基础上，保证数组元素唯一且按照升序排序。
// 实际上去重要考虑的东西很多，还是得问清楚数组中具体包含哪些类型的数据，如果有字符串元素，这时侯要怎么升序排序……
const flattenArrayAndUniqueAndSort = (arr) => {
  return [...new Set(flattenArray(arr))].sort((a, b) => a - b)
}

// test
const arr = [
  1,
  3,
  9,
  8,
  [1, 3, 2, [9, 8, 7, 4, 5, [6, 7]]],
  '10',
  '1',
  { name: 'nicholas' },
  { name: 'nicholas' }
]

// console.log('Flatten array =>', arr.flat(Infinity))
console.log('flattenArray =>', flattenArray(arr))
console.log('flattenArrayAndUniqueAndSort =>', flattenArrayAndUniqueAndSort(arr))
// console.log('Flatten array =>', flattenArray({ name: '123' }))
