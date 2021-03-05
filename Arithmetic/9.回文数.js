/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (x) => {
  if (!typeof x === 'number') return;
  let xStr = `${x}`, xReverseStr = '';
  for (let i = 0; i <xStr.length; i++) {
    xReverseStr += xStr[xStr.length - 1 -i];
  }
  return xStr === xReverseStr;
  // return x.toString() === x.toString().split('').reverse().join('');
};
// @lc code=end

