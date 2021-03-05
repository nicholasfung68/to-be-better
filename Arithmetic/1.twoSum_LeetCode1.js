/**
 * @description: 
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */


// // 1. 暴力解法，这样时间复杂度很高 O(n^2)
// const twoSum = (nums, target) => {
//   if (!nums || !target || !Array.isArray(nums) || !/\d/.test(target)) return

//   if (nums.length < 2) return -1

//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j]
//       }
//     }
//   }
// }


// // 2. 用差值求解 
// const twoSum = (nums, target) => {
//   if (!nums || !target || !Array.isArray(nums) || !/\d/.test(target)) return
//   if (nums.length < 2) return -1

//   let temp = []
//   for (let i = 0; i < nums.length; i++) {
//     let dif = target - nums[i]
//     if (temp[dif] !== undefined) {
//       return [temp[dif], i]
//     }
//     temp[nums[i]] = i // index: 是当前的值，nums[index]： 存储的是对应值的索引
//   }
// }

// 通过map（哈希表）
const twoSum = (nums, target) => {
  if (!nums || !target || !Array.isArray(nums) || !/\d/.test(target)) return
  if (nums.length < 2) return -1

  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let dif = target - nums[i]
    if (map.has(dif)) {
      console.log([map.get(dif), i])
      return [map.get(dif), i]
    }
    masp.set(nums[i], i) // key: 是当前的值，value: 存储的是对应值的索引
  }
}


const numsArr = [3, 2, 3], target = 6
console.log(twoSum(numsArr, target))
