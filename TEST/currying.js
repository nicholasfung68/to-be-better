// 柯里化

const add = (x, y) => x + y;
const curryingAdd = (x) => (y) => x + y;
// console.log(add(1, 2));
// console.log(curryingAdd(1)(2));

// 函数封装后
function check(reg, txt) {
  return reg.test(txt)
}

check(/\d+/g, 'test')       //false
check(/[a-z]+/g, 'test')    //true

// Currying后
function curryingCheck(reg) {
  return function(txt) {
      return reg.test(txt)
  }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1')      // true
hasNumber('testtest')   // false
