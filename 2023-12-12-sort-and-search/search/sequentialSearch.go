package searchdata

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2}
	// sr := SequentialSearch(list, 20)
	// fmt.Printf("最终结果 %v\n", sr)
	// list1 := []int{10, 20, 30, 40, 50, 60, 70}
	// sr1 := OrderedSequentialSearch(list1, 211)
	// fmt.Printf("最终结果 %v\n", sr1)
}

func SequentialSearch(list []int, target int) bool {
	pos := 0
	found := false
	for pos < len(list) && !found {
		if list[pos] == target {
			return true
		}
		pos += 1
	}
	return found
}

// 如果列表是有序的，只要遇到大于目标的元素，就知道后续的元素都不会再等于目标了，直接返回
func OrderedSequentialSearch(list []int, target int) bool {
	pos := 0
	found := false
	for pos < len(list) && !found {
		if list[pos] == target {
			return true
		}
		if list[pos] > target {
			return false
		}
		pos += 1
	}
	return found
}
