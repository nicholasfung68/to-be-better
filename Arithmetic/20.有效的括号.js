/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (s) => {
  if (typeof s !== 'string') return;
  if (s.length % 2) return false;
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      stack.push(s[i]);
    } else if (stack.length - 1 < 0 || map[stack[stack.length -1]] !== s[i]) {
      return false;
    } else {
      stack.pop();
    }
  }
  return stack.length === 0;
};
// @lc code=end

