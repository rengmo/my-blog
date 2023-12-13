package sortdata

import (
	"math/rand"
)

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2}
	// sortedList := QuickSort(list)
	// fmt.Printf("最终结果 %v\n", sortedList) // 最终结果 [1 2 5 6 7 8 9]
}

func QuickSort(list []int) []int {
	return quickSort(list, 0, len(list)-1)
}

func quickSort(list []int, left, right int) []int {
	if left < right {
		pivot := partition(list, left, right)
		quickSort(list, left, pivot-1)
		quickSort(list, pivot+1, right)
	}
	return list
}

func partition(list []int, start, end int) int {
	random := rand.Intn(end-start+1) + start
	swap(list, random, end)

	small := start - 1
	for i := start; i < end; i++ {
		if list[i] < list[end] {
			small++
			swap(list, i, small)
		}
	}
	small++
	swap(list, small, end)
	return small
}
