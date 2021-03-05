// PS：目前只支持带一位字母的版本号

// 去除数组中的 空值 或 空格值
if (!Array.prototype.trim) {
  Array.prototype.trim = function() {
    const arr = []
    this.forEach(i => {
      // 一个或多个空格
      if (i.match(/\S+/)) {
        arr.push(i)
      }
    })
    return arr
  }
}

// 版本号提取字符
const toChar = (ver) => {
  const verStr = ver.toString()
  const str = verStr.split(/\.|\d/).join('')
  return str
}

// 假定字符串的每节数都在5位以下
// 版本号转成数值
const toNum = (ver) => {
  const verStr = ver.toString(), verArr = verStr.split('.').trim()
  const numPlace = ['0000', '000', '00', '0', '']

  for (let i = 0; i < verArr.length; i++) {
    const len = verArr[i].length
    verArr[i] = numPlace[len] + verArr[i]
  }

  return verArr.join('')
}

const compareVersion = (ver1, ver2)  => {
  const v1 = Number(toNum(ver1)), v1char = toChar(ver1), v2 = Number(toNum(ver2)), v2char = toChar(ver2)

  if (v1 > v2) {
    console.log(`版本号${ver1}是新版本。`)
  } else if (v1 < v2) {
    console.log(`版本号${ver2}是新版本。`)
  } else {
    // v1 === v2 , 再比较最后一位字母
    const char1 = v1char.charCodeAt(0).toString(16), char2 = v2char.charCodeAt(0).toString(16)
    // console.log('char1 =>', char1, '\nchar2 =>', char2)
    if (char1 > char2) {
      console.log(`版本号${ver1}是新版本。`)
    } else if (char1 < char2) {
      console.log(`版本号${ver2}是新版本。`)
    } else {
      console.log(`版本号相同。`)
    }
  }
}

let a = '1.0.69', b = '1.0.68'
compareVersion(a, b)
