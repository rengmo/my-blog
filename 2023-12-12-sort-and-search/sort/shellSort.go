package sortdata

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2, -5}
	// ShellSort(list)
	// fmt.Printf("最终结果 %v\n", list)
}

func ShellSort(list []int) {
	for gap := len(list) / 2; gap > 0; gap /= 2 {
		for i := gap; i < len(list); i++ {
			cur := list[i]
			preIdx := i - gap
			for preIdx >= 0 && list[preIdx] > cur {
				list[preIdx+gap] = list[preIdx]
				preIdx -= gap
			}
			list[preIdx+gap] = cur
		}
	}
}
