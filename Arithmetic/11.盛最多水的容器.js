/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */

// 思路：双指针遍历 两个下标对应值的较小值乘以两个下标之间的距离
// 使用双指针， 时间复杂度O(n)，空间复杂度
var maxArea = function(height) {
  if (!height || !Array.isArray(height)) return;
  const len = height.length;
  if (!(len >= 2 && len <= 3 * Math.pow(10, 4))) return;
  let sum = 0, L = 0, R = len - 1;
  while (L < R) {
    sum = Math.max((Math.min(height[L], height[R]) * (R - L)), sum);
    if (height[L] <= height[R]) {
      L++;
    } else {
      R--;
    }
  }
  return sum;
};
// @lc code=end

