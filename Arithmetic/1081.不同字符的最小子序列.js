/*
 * @lc app=leetcode.cn id=1081 lang=javascript
 *
 * [1081] 不同字符的最小子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
  if (!s || typeof s !== 'string') return;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (stack.indexOf(s[i]) >= 0) continue;
    while (
      stack.length && stack[stack.length - 1] > s[i]
        && s.indexOf(stack[stack.length - 1], i) > i
    ) {
      stack.pop();
    }
    stack.push(s[i]);
  }
  return stack.join('');
};
// @lc code=end

