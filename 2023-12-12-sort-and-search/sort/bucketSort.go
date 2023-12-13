package sortdata

import (
	"math"
)

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2, 26, 12}
	// sortedList := BucketSort(list)
	// fmt.Printf("最终结果 %v\n", sortedList) // 最终结果 [1 2 5 6 9 8 7 12 26]
}

func BucketSort(list []int) []int {
	length := len(list)
	maxNum := getMaxInList(list)
	buckets := make([][]int, length)

	var index int
	for _, val := range list {
		index = (length - 1) * val / maxNum
		buckets[index] = append(buckets[index], val)
	}

	pos := 0
	for i := 0; i < length; i++ {
		bl := len(buckets[i])
		if bl > 0 {
			buckets[i] = sortInBucket(buckets[i])
			copy(list[pos:], buckets[i])
			pos += bl
		}
	}
	return list
}

// 桶内的排序选择使用插入排序
func sortInBucket(bucket []int) []int {
	for i, cur := range bucket {
		preIdx := i - 1
		for preIdx >= 0 && bucket[i] > cur {
			bucket[preIdx+1] = bucket[preIdx]
			preIdx -= 1
		}
		bucket[preIdx+1] = cur
	}
	return bucket
}

func getMaxInList(list []int) int {
	maxNum := math.MinInt
	for _, val := range list {
		if val > maxNum {
			maxNum = val
		}
	}
	return maxNum
}
