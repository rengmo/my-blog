package sortdata

import (
	"fmt"
	"sort"
)

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
	return fmt.Sprintf("%s: %d", p.Name, p.Age)
}

/*
ByAge实现了sort.Interface接口 基于Age字段对[]Person进行排序
*/
type ByAge []Person

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }

func init() {
	// goSort()
}

func goSort() {
	people := []Person{
		{"张三", 31},
		{"李四", 42},
		{"王五", 17},
		{"赵六", 26},
	}

	fmt.Println(people) // [张三: 31 李四: 42 王五: 17 赵六: 26]
	// 有两种方式排序切片，一种方式是为slice类型定义好方法集，比如为ByAge类型定义好方法集，然后调用sort.Sort。
	sort.Sort(ByAge(people))
	fmt.Println(people) // [王五: 17 赵六: 26 张三: 31 李四: 42]

	// 第二种方式是调用sort.Slice方法，包含一个自定义的Less方法
	sort.Slice(people, func(i, j int) bool {
		return people[i].Age > people[j].Age
	})
	fmt.Println(people) // [李四: 42 张三: 31 赵六: 26 王五: 17]

	people1 := make([]Person, len(people))
	copy(people1, people)
	people1[0] = Person{"测试", 1}
	fmt.Println(people)  // [李四: 42 张三: 31 赵六: 26 王五: 17]
	fmt.Println(people1) // [测试: 1 张三: 31 赵六: 26 王五: 17]
}
