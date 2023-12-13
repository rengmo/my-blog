package shallowcopy

func init() {
	// a1 := [3]int{10, 20, 30}
	// a2 := a1
	// a2[0] = 100
	// fmt.Println(a1) // [10 20 30]
	// fmt.Println(a2) // [100 20 30]

	// s1 := []int{1, 2, 3, 4, 5}
	// s2 := s1
	// s2[0] = 100
	// fmt.Println(s1) // [100 2 3 4 5]
	// fmt.Println(s2) // [100 2 3 4 5]

	// s3 := make([]int, len(s1))
	// copy(s3, s1) // 将s1的值复制到s3
	// s3[0] = 500
	// fmt.Println(s1) // [100 2 3 4 5]
	// fmt.Println(s3) // [500 2 3 4 5]

	// s4 := [][]int{
	// 	{1, 2, 3},
	// 	{4, 5},
	// }
	// s5 := make([][]int, len(s4))
	// copy(s5, s4)

	// s5[0][0] = 100
	// fmt.Println(s4) // [[100 2 3] [4 5]]
	// fmt.Println(s5) // [[100 2 3] [4 5]]

	// s6 := make([][]int, len(s4))
	// for i, val := range s4 {
	// 	item := make([]int, len(val))
	// 	copy(item, val)
	// 	s6[i] = item
	// }
	// s6[0][0] = 500
	// fmt.Println(s4) // [[100 2 3] [4 5]]
	// fmt.Println(s6) // [[500 2 3] [4 5]]
}
