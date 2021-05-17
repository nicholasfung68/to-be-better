export class Node {
  constructor(element) {
    this.element = element; // 要加入链表元素的值
    this.next = undefined; // 指向链表中下一个元素的指针
  }
}

export class DoblyNode extends Node {
  constructor(element, next, prev) {
    super(element, next); // 相当于这两句: this.element = element; this.next = undefined;
    this.prev = undefined;
  }
}