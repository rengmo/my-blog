package searchdata

import (
	"fmt"
	"sort"

	"golang.org/x/exp/slices"
)

func init() {
	// goSearch()
}

func goSearch() {
	target := 20
	data := []int{1, 10, 20, 199, 122, 123}

	i := sort.Search(len(data), func(i int) bool { return data[i] >= target })
	if i < len(data) && data[i] == target {
		fmt.Println("data中找到了目标值", data[i])
	} else {
		fmt.Printf("data中没有找到目标值, 如果要将目标值放入data中, 可以放在索引%v中的位置\n", i)
	}

	target1 := 20
	data1 := []int{199, 122, 1, 10, 20, 123}
	idx := slices.IndexFunc(data1, func(item int) bool { return item == target1 })
	if idx == -1 {
		fmt.Println("没有找到目标值")
	} else {
		fmt.Printf("找到了目标值，在索引%v的位置\n", idx)
	}
}
