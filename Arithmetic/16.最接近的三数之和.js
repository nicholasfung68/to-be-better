/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  if (!nums || !Array.isArray(nums) || typeof target !== 'number') return;
  nums.sort((a, b) => a - b);
  const len = nums.length;
  if (!(len >= 3 && len <= Math.pow(10, 3)) || !(target >= -Math.pow(10, 4) && target <= Math.pow(10, 4)) ) return;
  let res = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < len - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let L = i + 1, R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum;
      } 
      if (sum === target) {
        return sum;
      } else if (sum > target) {
        while (nums[R] === nums[R - 1]) R--;
        R--;
      } else {
        while (nums[L] === nums[L + 1]) L++;
        L++;
      }
    }
  }
  return res;
};
// @lc code=end

