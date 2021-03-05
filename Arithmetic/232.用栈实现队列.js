/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
// 队列 FIFO（First In First Out），只能从队列前端移除元素，从队列后增加元素
var MyQueue = function() {
  this.items = {};
  this.count = 0;
  this.lowestCount = 0;
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.items[this.count] = x;
  this.count++;
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if (this.empty()) return undefined;
  const removeElement = this.items[this.lowestCount];
  delete this.items[this.lowestCount];
  this.lowestCount++;
  return removeElement; 
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  if (this.empty()) return undefined;
  return this.items[this.lowestCount];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.count - this.lowestCount === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end

