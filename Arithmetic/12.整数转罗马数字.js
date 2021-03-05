/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
  思路：将数字转化成两数两数想加： 例如 1994(t) = 1000(a) + 994(b), 1000在map不是undefined（map[a] !== undefined），所以将map[a]入栈；
  之后，t = b; 994(t) = 900(a) + 94(b); map[a]入栈……
  94(t) = 90(a) + 4 (b)……
  最后依次栈出栈反转即为答案。

 * @param {number} num
 * @return {string}
 */
// 解法1
var intToRoman = function(num) {
  if (!num || typeof num !== 'number') return;
  if (!(num >= 1 && num <= 3999)) return;
  const numArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romanStrArr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let res = '';
  for (let i = 0; i < numArr.length && num > 0; i++) {
    while(numArr[i] <= num) {
      num -= numArr[i];
      res += romanStrArr[i];
    }
  }
  return res;
};

/* // 解法2
var intToRoman = function(num) {
  if (!num || typeof num !== 'number') return;
  if (!(num >= 1 && num <= 3999)) return;
  const thousands = ['', 'M', 'MM', 'MMM'],
        hundreds = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  let res = '';
  res = thousands[Math.floor(num / 1000)] + hundreds[Math.floor(num % 1000 / 100)] + tens[Math.floor(num % 100 / 10)] + ones[Math.floor(num % 10)];
  return res;
}; */

// @lc code=end

