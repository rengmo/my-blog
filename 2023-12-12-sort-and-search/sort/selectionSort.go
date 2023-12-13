package sortdata

import "fmt"

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2}
	// SelectionSort(list)
	// fmt.Printf("最终结果 %v\n", list)
}

func SelectionSort(list []int) {
	for i := 0; i < len(list)-1; i++ {
		minIndex := i
		for j := i + 1; j < len(list); j++ {
			if list[j] < list[minIndex] {
				minIndex = j
			}
		}
		swap(list, i, minIndex)
		fmt.Printf("第%v次外循环后的结果 %v\n", i+1, list)
	}
}
