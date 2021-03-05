/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = (strs) => {
  if (!strs || !Array.isArray(strs)) return;
  let str = strs[0], commonPrefix = '';
  if (!str) return commonPrefix;
  for (let i = 0; i < str.length; i++) {
    if (strs.every(item => item[i] === str[i])) {
      commonPrefix += str[i];
    } else {
      return commonPrefix;
    }
  }
  return commonPrefix;
};
// @lc code=end

