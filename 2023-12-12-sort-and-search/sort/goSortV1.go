package sortdata

import (
	"fmt"
	"sort"
)

func init() {
	// goSortV1()
}

func goSortV1() {
	data := []int{10, 2, 5, 9, 1}
	data1 := make([]int, len(data))
	copy(data1, data) // 将data中的数据复制到data1中
	sort.Slice(data1, func(i, j int) bool { return data1[i] < data1[j] })
	fmt.Println(data1) // [1 2 5 9 10]
	fmt.Println(data)  // [10 2 5 9 1]

	// 要注意切片中包含的数据是引用类型的情况，此时复制的切片中的切片的元素没有复制值，复制的是引用地址
	// 所以被复制值和原始值之间还会相互影响，这种情况下要完全复制，就需要创建新的对象，遍历原始对象的值，放到新对象中
	x := [][]int{{1, 2}, {3}}
	x1 := make([][]int, len(x))
	copy(x1, x)
	x1[1] = []int{6}
	fmt.Println(x)  // [[1 2] [3]]
	fmt.Println(x1) // [[1 2] [6]]

	x1[0][0] = 100
	fmt.Println(x)  // [[100 2] [3]]
	fmt.Println(x1) // [[100 2] [6]]
}
