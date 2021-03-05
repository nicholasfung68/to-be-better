/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */

// 思路2020-11-27 PM
// 1、不是数字类型或者null、undefined，不往下执行，输入是0直接返回0
// 2、判断传入的数字是正数还是负数，做好标识，便于输出符号保持不变
// 3、将数字转换成字符串类型，进行反转，反转后的字符串，如果第一位是0，可以去掉不显示
// 4、判断反转后的数字是否在[−2^31,  (2^31) − 1]之间，在的话返回反转后的数值（有符号，记得区分正负），否则溢出返回0

const reverse = (x) => {
  if (!typeof x === 'number') return;
  if (x === 0) return 0;
  const isNegative = x < 0; // 判断是否是负数
  let reverseStr = '', xStr = `${x}`, target;
  isNegative && (xStr = xStr.slice(1)); // 把减号字符 ‘-’去掉
  const len = xStr.length;
  if (len <= 1) {
    reverseStr = x
  } else {
    for (let i = 0; i < len; i++) {
      reverseStr += xStr[len - 1 - i];
    }
  }
  isNegative && (reverseStr = `-${reverseStr}`);
  target = Number(reverseStr);
  return (target >= -Math.pow(2, 31) && target <= Math.pow(2, 31) - 1) ? target : 0;
};

// @lc code=end

