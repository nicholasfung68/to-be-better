/**
 * @description: 使用JavaScript实现栈（Stack）
 * @param {*}
 * @return {*}
 */

class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element) { // 入栈，添加一个(或几个)新元素到栈顶
    this.items[this.count] = element;
    this.count++;
  }

  pop() { // 出栈，移除栈顶的元素，同时返回被移除的元素
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count]; // 对象使用delete删除属性
    return result;
  }

  peek() { // 返回栈顶的元素，不对栈做任何修改(该方法不会移除栈顶的元素，仅仅返回它)
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() { // 如果栈里没有任何元素就返回 true，否则返回 false
    return this.count === 0;
  }

  clear() { // 移除栈里的所有元素
    // while(!this.isEmpty()) {
    //   this.pop();
    // }
    this.items = {};
    this.count = 0;
  }

  size() { // 返回栈里的元素个数。该方法和数组的 length 属性很类似
    return this.count;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`; // 先取出栈低元素，然后再遍历拼接
    for (let i = 1; i <= this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}


const decimalToBinary = (decNumber) => {
  const remStack = new Stack();
  let number = decNumber, rem, binaryString = '';

  while(number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while(!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
};

const baseConverter = (decNumber, base) => {
  if (!decNumber || !base) return;
  if (!(base >=2 && base <=36)) return '';

  const remStack = new Stack();
  const placeString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rem, number = decNumber, baseSring = '';

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()) {
    baseSring += placeString[remStack.pop()]; // remStack.pop()的返回值是一个数值， 字符串有length属性，可以通过sting[n]取到对应索引元素
  }

  return baseSring;
};
