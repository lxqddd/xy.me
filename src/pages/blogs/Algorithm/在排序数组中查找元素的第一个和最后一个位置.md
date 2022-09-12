# 解题思路

> 解这道题的主要思路其实还是遍历数组，找到数组中的的元素和目标值相等的那一个

## 详细思路

1. 首先需要定义一个空数组 ret，用来保存结果
2. 定义两个指针，L 和 R, 一个指向数组头，一个指向数组尾
   1. 这里定义一个指针，通过一个指针去定位当然是可以的，但是会慢一点，双管齐下会更快
3. 通过 while 循环，遍历数组
4. 如果 L 指向的元素和目标值相等并且 ret[0] 没有值，则给 ret[0] 赋值为 L，
5. 如果 ret[0] 已经有值，说明第一个元素已经找到，则不需要再复制了，而指针 L 也不需要再移动
6. R 跟 L 同理，只不过 R 是从右向左移动
7. 如果 ret[0] 和 ret[1] 都已经找到，则直接返回 ret
8. 如果最终都没有找到，那就返回[-1, -1]，表示 target 再数组中不存在

## 完整代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let ret = []
  let L = 0
  let R = nums.length - 1
  while (L <= R) {
    if (nums[L] === target && !ret[0]) {
      ret[0] = L
    } else if (!ret[0]) {
      L++
    }
    if (nums[R] === target && !ret[1]) {
      ret[1] = R
    } else if (!ret[1]) {
      R--
    }

    if (ret[0] != undefined && ret[1] != undefined) {
      return ret
    }
  }

  return [-1, -1]
}

const nums = [5, 7, 7, 8, 8, 10]
const target = 6

console.log(searchRange(nums, target))
```
