/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

// 解题思路(2020-11-30 PM)：
// 1. 根据题目给出的信息，建立map表
// 2. 遍历输入的字符串，到map表查找key对应的value想加
// 3. 优先处理特殊情况的字符搭配，对应减去2或者20或者200
var romanToInt = function(s) {
  if (!s || !typeof s === 'string') return;
  const map = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
    // 以下是特殊情况，优先处理（有规律，减去2或者20或者200）
    'IV': 4,
    'IX': 9,
    'XL': 40,
    'XC': 90,
    'CD': 400,
    'CM': 900,
  };

  let res = 0, len = s.length;
  for (let i = 0; i < len; i++) {
    res += map[s[i]];
  }
  if (s.includes('IV') || s.includes('IX')) res -= 2;
  if (s.includes('XL') || s.includes('XC')) res -= 20;
  if (s.includes('CD') || s.includes('CM')) res -= 200;
  return res;
};
// @lc code=end

