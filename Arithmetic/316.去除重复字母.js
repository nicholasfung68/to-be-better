/*
 * @lc app=leetcode.cn id=316 lang=javascript
 *
 * [316] 去除重复字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 首先要知道什么叫 “字典序”。字符串之间比较跟数字之间比较是不太一样的。
// 字符串比较是从头往后一个字符一个字符比较的。哪个字符串大取决于两个字符串中
// 第一个对应不相等的字符 。根据这个规则，任意一个以 a 开头的字符串都小于任意一个以 b 开头的字符串。

/**
 * @think 利用栈和贪心算法的思想
 *        1. 维护一个栈stack，对字符串进行正序遍历
 *        2. 对每个字符char，首先判断stack中是否存在，
 *          2.1 若stack栈顶值比char大且后续还存在此值，则将栈顶弹出；
 *            2.1.1 使用indexOf(xx, i)取代 lastIndexOf(xx)减少遍历次数会更快，从索引i开始遍历
 *        3. 入栈每个char
 *        4. 打印栈底到栈顶即为结果
 * @time O(nlogn) 
 * @space 0(1) 只需借用一个栈
 * @param {string} s
 * @return {string}
 */

var removeDuplicateLetters = function(s) {
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

