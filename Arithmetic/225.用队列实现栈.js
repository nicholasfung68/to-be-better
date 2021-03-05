/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.items = {};
  this.count = 0;
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  if (typeof x !== 'number') return new TypeError(`${x} is not a number!`);
  this.items[this.count] = x;
  this.count++;
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  if (this.empty()) return undefined;
  const remEl = this.items[this.count - 1];
  delete this.items[this.count - 1];
  this.count--;
  return remEl;
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  if (this.empty()) return undefined;
  return this.items[this.count -1];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.count === 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end

