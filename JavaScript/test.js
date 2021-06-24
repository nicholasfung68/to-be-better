/**
题目1：xAyB猜字游戏
输入两组数字，每组数字包含4个非负整数，同一组中的四个数字互不相同，数字间以空格分隔。
第一组数字为猜数字游戏的正确答案，第二组数字为玩家所猜的答案，根据以下规则输出猜数字的结果xAyB。
规则1：如果数字相同，且位置相同，则得到一个A
规则2：如果数字相同，且位置不同，则得到一个B
输入描述：两组数字，每组数字包含4个非负整型数字，同一组中的四个数字互不相等，数字以空格分隔
输出描述：xAyB
示例：
输入：
  1 2 3 4
  1 2 5 3
输出：
  2A1B
*/
const guessWordResult = (str1, str2) => {
  const arr1 = str1.split(' ')
  const arr2 = str2.split(' ')
  let x = 0, y = 0
  for (let i = 0; i < arr1.length; i += 1) {
    for (let j = 0; j < arr2.length; j += 1) {
      if (arr1[i] === arr2[j]) {
        if (i === j) {
          x += 1
        } else {
          y += 1
        }
      }
    } 
  }

  return `${x}A${y}B`
}

console.log('guessWordResult =>', guessWordResult('1 2 3 4', '1 3 4 2'))



/**
 * 题目2：歌唱打分
青年歌手大赛评委打分，打分规则是去掉一个最高分和一个最低分，然后计算平均分。
输入描述：输入数据有多组，每组占一行，每行第一个数n表示评委人数，然后是n个评委的打分
输出描述：输出保留两位小数，每组输出一行
示例：
输入：
  3    99    98    97
  4    100    99    98    97
输出：
  98.00
  98.50
 */
const getAverageScore = function(...args) {
  const argArr = [].slice.call(arguments)
  const res = []
  for (let i = 0; i < argArr.length; i += 1) {
    let tempArr = []
    if (argArr[i] instanceof Array) {
      tempArr = argArr[i]
    } else if (Object.prototype.toString.call(argArr[i]) === '[object String]') {
      tempArr = argArr[i].split(' ').map(i => parseInt(i, 10))
    } else {
      return new Error('Input error.')
    }
    const targetArr = tempArr.slice(1).sort((a, b) => a - b).slice(1, tempArr.length - 2) // slice 不改变原数组 去掉评委人数，升序排序后去掉最低最高分
    const averageScope = ((targetArr.reduce((acc, cur) => acc + cur)) / targetArr.length).toFixed(2)
    res.push(averageScope)
  }

  let result = `${res[0]}`
  for (let i = 1; i < res.length; i += 1) {
    result += `\n${res[i]}`
  }

  return result
}

console.log(
  'getAverageScore:\n' +
  getAverageScore(
    '3 99 98 97',
    [4, 100, 99, 98, 97]
  )
)
