// 10000000.01 => 10,000,000.01
// 数字转换为千分位

const transferToThousand = (num) => {
  let result = ''
  let count = 0
  num = (num || 0).toString()

  for (let i = num.length - 1; i >= 0; i -= 1) {
    count += 1
    result = num.charAt(i) + result
    if (!(count % 3) && i !== 0 && num.charAt(i) !== '.') {
      result = ',' + result
    }
  }

  return result
}

const toThousands = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => $1 + ',')
}


const numberWithCommas = (x) => {
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // 正则可以改成/\B(?=(\d{3})+\b)/g
  return x.toString().replace(/\B(?=(\d{3})+\b)/g, ',')
}

const numberToThousands = (x) => {
  return x.toLocaleString()
}


// test
// console.log(transferToThousand(10000000.01)) // 10,000,000.01
// console.log(toThousands(10000000.01)) // 10,000,000.01
// console.log(numberWithCommas(10000000.01)) // 10,000,000.01
// console.log(numberToThousands(10000000.01)) // 10,000,000.01


// // 实际上就是实现深克隆
// const deepClone = (obj) => {
//   if (Object.prototype.toString.call(obj) !== '[object Object]' || !Array.isArray(obj)) {
//     return obj
//   }
//   let res = Array.isArray(obj) ? [] : {}
//   for (const key in obj) {
//     res = res.concat(Array.isArray(obj[key]) ? obj[key] : deepClone(obj[key]))
//   }
//   return res
// }

// // test
// const a = {
//   a: 1,
//   b: {
//     c: 2,
//     d: {
//       e: 3,
//       f: 'hello world'
//     }
//   }
// }
// const b = deepClone(a)
// console.log(a === b) // true, 深刻隆，内存地址也一样了……
// console.log(111, b) // 111 { a: 1, b: { c: 2, d: { e: 3, f: 'hello world' } } }
// a.a = 100
// console.log(222, b) // 222 { a: 100, b: { c: 2, d: { e: 3, f: 'hello world' } } }
// a.b.d = [5, 2, 0]
// console.log(333, b) // 333 { a: 100, b: { c: 2, d: [ 5, 2, 0 ] } }





const dfsGetArr = (arr) => {
  let res = []
  for (let i = 0; i < arr.length; i += 1) {
    res.push(arr[i].id)
    const children = arr[i].children
    if (children) {
      res = res.concat(dfsGetArr(children))
    }
  }
  return res
}

// test
const arr = [
  {
    id: 1,
    children: [
      {
        id: 12,
        children: [
          {
            id: 13,
            children: [
              {
                id: 14,
                children: [
                  {
                    id: 15,
                    children: [
                      {
                        id: 16,
                        children: null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    children: [
      {
        id: 21,
        children: null
      }
    ]
  }
]

// console.log(dfsGetArr(arr)) // [ 1, 12, 13, 14, 15, 16, 2, 21 ]

