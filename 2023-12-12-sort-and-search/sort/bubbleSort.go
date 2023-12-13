package sortdata

import "fmt"

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2}
	// BubbleSortV2(list)
	// fmt.Printf("最终结果 %v\n", list)
}

func BubbleSortV1(list []int) {
	// 一共循环n-1次，每次循环后，最大的数字会到列表最右端
	// 将后n-1个数字都移动到合适的位置后，最后剩下的第一个元素自然是最小的，所以只用循环n-1次
	for i := 0; i < len(list)-1; i++ {
		// 每个循环比较n-1次，n个数字两两比较只需要比较n-1次
		for j := 0; j < len(list)-1; j++ {
			left := j
			right := j + 1
			if list[left] > list[right] {
				swap(list, left, right)
			}
		}
		fmt.Printf("第%v次外循环后的结果 %v\n", i+1, list)
	}
}

func BubbleSortV2(list []int) {
	for i := 0; i < len(list)-1; i++ {
		// 内层循环只需循环len(list)-1-i次
		for j := 0; j < len(list)-1-i; j++ {
			left := j
			right := j + 1
			if list[left] > list[right] {
				swap(list, left, right)
			}
		}
		fmt.Printf("第%v次外循环后的结果 %v\n", i+1, list)
	}
}

func BubbleSortV3(list []int) {
	for i := 0; i < len(list)-1; i++ {
		isSorted := true
		for j := 0; j < len(list)-1-i; j++ {
			left := j
			right := j + 1
			if list[left] > list[right] {
				swap(list, left, right)
				isSorted = false
			}
		}
		// 如果已经全部都排好序了，就结束循环
		if isSorted {
			break
		}
		fmt.Printf("第%v次外循环后的结果 %v\n", i+1, list)
	}
}

func swap(list []int, i, j int) {
	if i == j {
		return
	}
	list[i], list[j] = list[j], list[i]
}
