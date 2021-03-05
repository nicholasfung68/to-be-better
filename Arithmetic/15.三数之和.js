/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = (nums) => {
  const targetArr = [];
  if (!nums || !Array.isArray(nums) || nums.length < 3) return targetArr;
  nums.sort((a ,b) => a - b); // 升序排序
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break; // nums[i] > 0，三数之和必然大于0，要跳出循环 
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重
    let L = i + 1, R = nums.length - 1; // 双指针
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum === 0) {
        targetArr.push([nums[i], nums[L], nums[R]]);
        while(nums[L] === nums[L + 1]) L++; // 去重
        while(nums[R] === nums[R - 1]) R--; // 去重
        L++;
        R--;
      } else if (sum < 0) {
        L++;
      } else { // sum > 0
        R--;
      }
    }
  }
  return targetArr;
};
// @lc code=end

