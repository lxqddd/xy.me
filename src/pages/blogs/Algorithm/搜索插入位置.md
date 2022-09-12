# 解题思路

1. 判断目标值在数组中是否存在，如果存在，返回索引值
2. 如果不存在，判断目标值是否比数组的第一个值小，如果是，返回 0
3. 判断目标值是否比数组的最后一个元素小，如果是，返回数组的长度
4. 如果以上条件都不成立，遍历数组，找到数组中第一个比目标值大的元素，返回该元素的索引值

## 完整代码如下

### 方案一

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let i = 0
  if (target < nums[0]) return 0
  if (target > nums[nums.length - 1]) return nums.length
  while (i < nums.length) {
    if (nums[i] >= target) {
      return i
    }
    i++
  }
}
```

### 方案二

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let hasTarget = nums.indexOf(target)
  if (hasTarget >= 0) return hasTarget
  if (target > nums[nums.length - 1]) return nums.length
  for (let i = 0; i < nums.length; i++) {
    if (target <= nums[i]) {
      return i
    }
  }
}
```
