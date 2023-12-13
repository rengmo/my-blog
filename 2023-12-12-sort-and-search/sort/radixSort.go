package sortdata

import (
	"strconv"
)

func init() {
	// list := []int{5, 16, 9, 18, 15, 7, 2, 26, 12}
	// sortedList := RadixSort(list)
	// fmt.Printf("最终结果 %v\n", sortedList) // 最终结果 [2 5 7 9 12 15 16 18 26]
}

func RadixSort(list []int) []int {
	maxDigit := maxBit(list)
	mod, div := 10, 1
	for i := 0; i < maxDigit; i++ {
		buckets := [10][]int{}
		for _, num := range list {
			bucket := (num % mod) / div
			buckets[bucket] = append(buckets[bucket], num)
		}
		index := 0
		for _, bucket := range buckets {
			for _, num := range bucket {
				list[index] = num
				index++
			}
		}

		mod *= 10
		div *= 10
	}
	return list
}

func maxBit(list []int) int {
	maxVal := 0
	for _, val := range list {
		if val > maxVal {
			maxVal = val
		}
	}
	return len(strconv.Itoa(maxVal))
}
