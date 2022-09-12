# 解题思路

> 整体思路和三数之和非常类似，这里只不过是多加了一层循环，用的还是双指针

## 完整代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function fourSum(nums, target) {
  // 用于记录结果
  const ret = []
  // 记录数组长度
  const len = nums.length
  // 如果数组长度小于4的话，返回空数组
  if (len < 4) return ret
  // 将数组排序，目的还是为了在双指针移动的时候方便去重
  nums.sort((a, b) => a - b)

  // 遍历数组
  for (let i = 0; i < len - 3; i++) {
    // 如果当前项和上一项相同，进行下一轮循环
    if (i > 0 && nums[i] === nums[i - 1]) continue
    for (let j = i + 1; j < len - 2; j++) {
      // 同上
      if (j > i + 1 && nums[j] === nums[j - 1]) continue
      // 记录两个指针L和R
      let L = j + 1
      let R = len - 1
      // 控制两个指针移动
      while (L < R) {
        // 求和
        const sum = nums[i] + nums[j] + nums[L] + nums[R]
        // 如果当前四数之和和目标值相等，将这四个数存到ret中
        if (sum === target) {
          ret.push([nums[i], nums[j], nums[L], nums[R]])
          // 去重
          while (L < R && nums[L] === nums[L + 1]) L++
          while (L < R && nums[R] === nums[R - 1]) R--
          L++
          R--
        } else if (sum > target) {
          // 如果当前四数之和大于目标值，向左移动右指针，减小较大的数
          R--
        } else if (sum < target) {
          // 如果当前四数之和小于目标值，向右移动左指针，增大较大的数
          L++
        }
      }
    }
  }
  return ret
}

// const nums = [1, 0, -1, 0, -2, 2]
const nums = [2, 2, 2, 2, 2]
const target = 8

console.log(fourSum(nums, target))
```
