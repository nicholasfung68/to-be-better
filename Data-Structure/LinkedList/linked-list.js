import { defaultEquals } from '../util.js';
import { Node } from './models/linked-list-node.js'

/*  
  push(element):向链表尾部添加一个新元素。
  insert(element, position):向链表的特定位置插入一个新元素。
  getElementAt(index):返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。
  remove(element):从链表中移除一个元素。
  indexOf(element):返回元素在链表中的索引。如果链表中没有该元素则返回-1。
  removeAt(position):从链表的特定位置移除一个元素。
  isEmpty():如果链表中不包含任何元素，返回 true，如果链表长度大于 0 则返回 false。
  size():返回链表包含的元素个数，与数组的 length 属性类似。
  toString():返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。
*/

export class LinkedList {
  constructor(equalFn = defaultEquals) {
    this.count = 0; // 用来存储链表中的元素数量。
    this.head = undefined;
    this.equalFn = equalFn;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) { //  head 元素为 undefined 或 null, this.head == null和(this.head === undefined || head === null)等价
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) { // 获得最后一项
        current = current.next;
      }
      current.next = node; // 将其 next 赋为新元素，建立链接, 链表最后一个节点的下一个元素始终是 undefined 或 null。
    }
    this.count++;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) { // 检查越界值
      let current= this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        let previous;
        for (let i = 0; i < index; i++) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next; // 将previous与current的下一项链接起来:跳过current，从而移除它
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) { // 在第一个位置添加
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index -1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.count++; // 更新链表的长度
      return true;
    }
    return false;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

/* const list = new LinkedList();
list.push(15);
list.push(10);
list.push(12);
console.log('linkedlist =>', list)
list.removeAt(1);
list.remove(10);
console.log('linkedlist =>', list)
console.log('head =>', list.getHead())
console.log('size =>', list.size())
console.log('isEmpty =>', list.isEmpty())
console.log('toString =>', list.toString()) */
