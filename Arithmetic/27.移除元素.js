/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = (nums, val) => {
  if (!Array.isArray(nums) || !typeof val === 'number') return;
  for (let i = 0; i < nums.length; i ++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--; // 重点在这，每次删除一个重复的数据，原有数组长度都减小1
    }
  }
  console.log(nums)
  return nums.length;
};
// @lc code=end

