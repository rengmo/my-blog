package deepcopy

import "fmt"

func init() {
	type Data struct {
		PointerData *int
		SliceData   []int
		mapData     map[string]int
	}
	var num = 1
	p1 := &num

	d5 := Data{
		PointerData: p1,
		SliceData:   []int{1, 2, 3},
		mapData:     map[string]int{"A": 1},
	}
	d6 := Data{
		PointerData: CopyPointer[int](d5.PointerData),
		SliceData:   CopySlice[int](d5.SliceData),
		mapData:     CopyMap[string, int](d5.mapData),
	}

	var num1 = 100
	p2 := &num1

	d6.PointerData = p2
	d6.SliceData[0] = 500
	d6.mapData["B"] = 1000

	fmt.Println(d5) // {0xc0000ac018 [1 2 3] map[A:1]}
	fmt.Println(d6) // {0xc0000ac048 [500 2 3] map[A:1 B:1000]}
}
