/**
 * @description: 
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
 * 请你找出所有满足条件且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 * @param {number[]} nums
 * @return {number[][]}
 */

const threeSum = (nums) => {
  const targetArr = [];

  if (!nums || !Array.isArray(nums) || nums.length < 3) return targetArr;

  nums.sort((a, b) => a - b); // sort()方法会改变原数组

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break; // num[i] > 0， 结果必然大于0(注意这是排序后的数组)， 所以停止循环
    if (i > 0 && (nums[i] === nums[i - 1])) continue; // 去重

    let L = i + 1, R = nums.length - 1; // 使用双指针

    while(L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (sum === 0) {
        targetArr.push([nums[i], nums[L], nums[R]])
        while (L < R && nums[L] === nums[L + 1]) L++; // 去重
        while(L < R && nums[R] === nums[R -1 ]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }

  return targetArr;
}


const arr = [-2,0,3,-1,4,0,3,4,1,1,1,-3,-5,4,0];
console.log(threeSum(arr))