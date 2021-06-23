const sliceString = (string, length) => {
  const str = typeof string === 'string' ? string : string.toString()
  const len = str.length, arr = []
  if (len > length) {
    const arrayLength = Math.ceil(len / length)
    let n1 = 0, n2 = length, n3 = 1
    for (let i = 0; i < arrayLength; i++) {
      arr.push(str.slice(n1, n2))
      n3 += 1
      n1 = n2
      n2 = n3 * length
    }
    return arr
  } else {
    return [str]
  }
}


let aaa = '应届领域个阿玉iiu会比较干豆腐和ui很贵和u呼呼吧姑姑'

console.log(sliceString(aaa, 10).join('\n'))
