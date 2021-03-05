/* 
  enqueue(element(s)):向队列尾部添加一个(或多个)新的项。
  dequeue():移除队列的第一项(即排在队列最前面的项)并返回被移除的元素。
  peek():返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动(不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似)。该方法在其他语言中也可以叫作 front 方法。
  isEmpty():如果队列中不包含任何元素，返回 true，否则返回 false。
  size():返回队列包含的元素个数，与数组的 length 属性类似。
*/

// 队列
class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0; // 用于记录队列的第一项
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const deleteElement = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return deleteElement;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  isEmpty() {
    // return this.size() === 0;
    return this.count - this.lowestCount === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    // while(!this.isEmpty()) {
    //   this.dequeue()
    // }
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) return '';
    let objString = this.items[this.lowestCount];
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}


// 使用队列来解决问题
// 问题一： 使用队列实现击鼓传花游戏
// 击鼓传花游戏(hotpotato)。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。
// 某一时刻传花停止， 这个时候花在谁手里，谁就退出圆圈、结束游戏
const hotPotato = (elementsList, num) => {
  if (!elementsList || !Array.isArray(elementsList) || !elementsList.length || !num || typeof num !== 'number') return;
  const queue = new Queue();
  const elimitatedList = [];
  for (const item of elementsList) {
    queue.enqueue(item);
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // 已经传花的的就往队列后挪
    }
    elimitatedList.push(queue.dequeue()); // 满足条件的就被淘汰
  }
  return {
    elimitated: elimitatedList,
    winner: queue.dequeue()
  };
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const res = hotPotato(names, 7);
