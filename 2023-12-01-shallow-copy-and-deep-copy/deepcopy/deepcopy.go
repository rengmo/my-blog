package deepcopy

import (
	"encoding/json"
	"fmt"
)

func init() {
	jsonCopy()
}

type Data struct {
	PointerData *int
	SliceData   []int
	mapData     map[string]int
}

func jsonCopy() {
	s7 := [][][]int{
		{{1, 2, 3}, {4, 5}},
		{{6}},
	}
	var s8 [][][]int
	b, _ := json.Marshal(s7)
	json.Unmarshal(b, &s8)

	s8[0][0][0] = 100

	fmt.Println(s7) // [[[1 2 3] [4 5]] [[6]]]
	fmt.Println(s8) // [[[100 2 3] [4 5]] [[6]]]

	d1 := Data{
		SliceData: []int{1, 2, 3},
		mapData:   map[string]int{"A": 1},
	}
	var d2 Data
	b1, _ := json.Marshal(d1)
	json.Unmarshal(b1, &d2)
	d2.SliceData[0] = 100
	fmt.Println(d1) // {[1 2 3] map[A:1]}
	fmt.Println(d2) // {[100 2 3] map[]}

	var d3 Data
	sliceData := make([]int, len(d1.SliceData))
	// 这个切片的复制可以直接用copy(sliceData, d1.SliceData) 替换
	for i, v := range d1.SliceData {
		sliceData[i] = v
	}
	d3.SliceData = sliceData
	d3.SliceData[0] = 500

	mapData := make(map[string]int)
	for key, val := range d1.mapData {
		mapData[key] = val
	}
	d3.mapData = mapData
	d3.mapData["B"] = 2

	fmt.Println(d1) // {[1 2 3] map[A:1]}
	fmt.Println(d3) // {[500 2 3] map[A:1 B:2]}
}
