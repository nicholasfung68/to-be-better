/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if (typeof haystack !== 'string' || typeof needle !== 'string') return;
  if (needle === '') return 0;

  const needleLen = needle.length;
  const haystackLen = haystack.length;

  // 字符串逐一比较, 滑动窗口，但是缺陷就是第一个字符不匹配也会往下比较，而应该在第一个字符没匹配到就停止循环
  for (let i = 0; i < haystackLen - needleLen + 1; ++i) {
    if (haystack.substring(i, i + needleLen) === needle) {
      return i;
    }
  }

  return -1;
};

// kmp 算法看不明白 后面再看看吧

// @lc code=end

