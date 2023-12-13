package searchdata

func init() {
	// list := []int{10, 20, 30, 40, 50, 60, 70}
	// sr := BinarySearch(list, 31)
	// fmt.Printf("最终结果 %v\n", sr)
}

func BinarySearch(list []int, target int) bool {
	left := 0
	right := len(list) - 1
	found := false
	for left <= right && !found {
		mid := (left + right) / 2
		if list[mid] == target {
			return true
		} else {
			if target < list[mid] {
				right = mid - 1
			} else {
				left = mid + 1
			}
		}
	}
	return found
}
