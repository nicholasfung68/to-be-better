/* 
  双端队列
  addFront(element):该方法在双端队列前端添加新的元素。
  addBack(element):该方法在双端队列后端添加新的元素(实现方法和 Queue 类中的 enqueue 方法相同)。
  removeFront():该方法会从双端队列前端移除第一个元素(实现方法和 Queue 类中的 dequeue 方法相同)。
  removeBack():该方法会从双端队列后端移除第一个元素(实现方法和 Stack 类中的 pop 方法一样)。
  peekFront():该方法返回双端队列前端的第一个元素(实现方法和 Queue 类中的 peek 方法一样)。
  peekBack():该方法返回双端队列后端的第一个元素(实现方法和 Stack 类中的 peek 方法一样)。
*/

class Deque {
  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeBack() {
    if (this.isEmpty()) return undefined;
    const removeBackElment = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return removeBackElment;
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element); // 复用方法，避免写重复代码
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]; // 所有元素往后移一位，腾出空间存放队列前端元素
        this.count++;
        this.lowestCount = 0;
        this.items[0] = element;
      }
    }
  }

  removeFront() {
    if (this.isEmpty()) return undefined;
    const removeFrontElement = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return removeFrontElement;
  }

  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) return '';
    let objStr = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objStr = `${objStr},${this.items[i]}`;
    }
    return objStr;
  }
}

// 问题二：检查字符串是否是回文
// 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam 或 racecar。
const palindromeChecker = (aString) => {
  if (!aString || typeof aString !== 'string') return false;
  const deque = new Deque();
  const lowerString = aString.toLocaleLowerCase().split(' ').join('');
  let isEqual = true, firstChar, lastChar;
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }
  while (deque.size() > 1 && isEqual) { // 有点类似于双指针
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));
