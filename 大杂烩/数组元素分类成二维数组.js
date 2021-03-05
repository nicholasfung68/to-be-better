let arr = [
  {
    id: '1',
    name: 'aa',
    value: '1'
  },
  {
    id: '1',
    name: 'bb',
    value: '2'
  },
  // {
  //   id: '2',
  //   name: 'aa',
  //   value: '11'
  // },
  // {
  //   id: '2',
  //   name: 'bb',
  //   value: '12'
  // },
  // {
  //   id: '3',
  //   name: 'aa',
  //   value: '13'
  // },
  // {
  //   id: '3',
  //   name: 'bb',
  //   value: '14'
  // }
]


// 要求按照id相同的分为一组
// 例如：
// [
//   [
//     {
//       id: '1',
//       name: 'aa',
//       value: '1'
//     },
//     {
//       id: '1',
//       name: 'bb',
//       value: '2'
//     }
//   ],
//   [
//     {
//       id: '2',
//       name: 'aa',
//       value: '11'
//     },
//     {
//       id: '2',
//       name: 'bb',
//       value: '12'
//     }
//   ],
//   [
//     {
//       id: '3',
//       name: 'aa',
//       value: '13'
//     },
//     {
//       id: '3',
//       name: 'bb',
//       value: '14'
//     }
//   ]
// ]


// // 分析容易得出，每个id就是一组，根据相同id归类即可。
// // 1、找出id个数，确定分多少组
// const groupNum = [...new Set(arr.map(i => i.id))]
// // console.log('groupNum=>', groupNum)

// // 2、根据id确定将元素分组
// let targetArr = []

// for (let i = 0; i < groupNum.length; i++) {
//   let temp = []
//   for (const item of arr) {
//     if (item.id === groupNum[i]) {
//       temp.push(item)
//     }
//   }
//   targetArr.push(temp)
// }

// console.log('targetArr =>', targetArr)


const arrayClassificationByKey = (arr, key) => {
  if (!arr instanceof Array) return new TypeError(`${arr} is not Array`)
  if (!key || (key && typeof key !== 'string')) return new Error('key cannot be null or undefined, and shuold be string')

  const targetArr = [], groupNum = [...new Set(arr.map(i => i[key]))]

  for (const i of groupNum) {
    const temp = []
    for (const item of arr) {
      if (item[key] === i) {
        temp.push(item)
      }
    }
    targetArr.push(temp)
  }

  return targetArr
}

arrayClassificationByKey(arr, 'id')