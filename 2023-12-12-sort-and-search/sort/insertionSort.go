package sortdata

import "fmt"

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2}
	// InsertionSort(list)
	// fmt.Printf("最终结果 %v\n", list)
}

func InsertionSort(list []int) {
	for i, cur := range list {
		// 将preIdx 设置为已排序序列的最右边元素的索引
		preIdx := i - 1

		/*
			第1次外循环时，preIdx为-1, 不满足preIdx >= 0 的条件，所以以下for循环中的代码块不会执行
			直接执行 list[preIdx+1] = cur 将索引0的元素设置为当前元素，相当于将索引0的元素当作已排序序列的第1个元素
		*/

		/*
			从右到左依次比较元素，如果cur比已排序序列中的元素小，就将已排序的元素往后挪动一位
			重复比较，直到找到一个合适的位置放置cur
		*/
		for preIdx >= 0 && list[preIdx] > cur {
			list[preIdx+1] = list[preIdx]
			preIdx -= 1
		}

		list[preIdx+1] = cur
		fmt.Printf("第%v次外循环后的结果 %v\n", i+1, list)
	}
}
