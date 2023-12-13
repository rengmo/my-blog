package sortdata

import (
	"math"
)

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2}
	// sortedList := CountingSort(list)
	// fmt.Printf("最终结果 %v\n", sortedList) // 最终结果 [1 2 5 6 7 8 9]
}

func CountingSort(list []int) []int {
	minNum := math.MaxInt
	maxNum := math.MinInt
	for _, val := range list {
		minNum = min(minNum, val)
		maxNum = max(maxNum, val)
	}
	counts := make([]int, maxNum-minNum+1)
	for _, val := range list {
		counts[val-minNum] += 1
	}

	i := 0
	for num := minNum; num <= maxNum; num++ {
		for counts[num-minNum] > 0 {
			list[i] = num
			i++
			counts[num-minNum] -= 1
		}
	}
	return list
}

func max(num1, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}
