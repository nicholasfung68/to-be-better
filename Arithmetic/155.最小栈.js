/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 */

// @lc code=start
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.items = {};
  this.count = 0; // 用于记录栈大小
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (!typeof x === 'number') return;
  this.items[this.count] = x;
  this.count++;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if (!this.count) return;
  delete this.items[this.count -1];
  this.count--;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if (!this.count) return;
  return this.items[this.count - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  if (!this.count) return;
/*   const valArr = Object.values(this.items).sort((a, b) => a - b);
  return valArr[0]; */
  const valArr = [];
  for (const key in this.items) {
    valArr.push(this.items[key]);
  }
  let minVal = valArr[0];
  for (let i = 1; i < valArr.length; i++) {
    minVal = minVal < valArr[i] ? minVal : valArr[i];
  }
  return minVal;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end

