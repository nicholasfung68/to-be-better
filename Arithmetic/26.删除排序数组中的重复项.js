/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = (nums) => {
  if (!nums || !Array.isArray(nums) || !nums.length) return;
  for (let i = 0; i < nums.length; i ++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
      i -= 1; // 重点在这，每次删除一个重复的数据，原有数组长度都减小1
    }
  }
  return nums.length;
}
// @lc code=end

