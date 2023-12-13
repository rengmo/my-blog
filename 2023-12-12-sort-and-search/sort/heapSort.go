package sortdata

import "fmt"

func init() {
	list := []int{5, 6, 9, 8, 1, 7, 2}
	sortedList := HeapSort(list)
	fmt.Printf("最终结果 %v\n", sortedList) // 最终结果 [1 2 5 6 7 8 9]
}

func HeapSort(list []int) []int {
	length := len(list)
	buildMaxHeap(list, length)
	for i := length - 1; i >= 1; i-- {
		swap(list, 0, i)
		length -= 1
		heapify(list, 0, length)
	}
	return list
}

func buildMaxHeap(list []int, length int) {
	for i := length/2 - 1; i >= 0; i-- {
		heapify(list, i, length)
	}
}

func heapify(list []int, i, length int) {
	left := 2*i + 1
	right := 2*i + 2
	largest := i
	if left < length && list[left] > list[largest] {
		largest = left
	}
	if right < length && list[right] > list[largest] {
		largest = right
	}
	if largest != i {
		swap(list, i, largest)
		heapify(list, largest, length)
	}
}
