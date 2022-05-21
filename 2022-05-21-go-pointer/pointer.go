package main

import (
	"fmt"
)

func main() {
	var a int = 111
	var b *int = &a

	fmt.Println("a的值是:", a)   // 111
	fmt.Println("a的地址是:", &a) // 0xc000016098
	fmt.Println("b的值是:", b)   // 0xc000016098
	fmt.Println("b的地址是:", &b) // 0xc0000ac018

	*b = *b + 1
	fmt.Println(a, b) // 112 0xc000016098
	var c float64 = 222.22
	fmt.Println(&c) // 1. 对变量c进行寻址操作 0xc0000b2008
	var d *float64 = &c
	fmt.Println(&*d) // 2.对指针间接引用（*d）进行寻址操作 0xc0000b2008

	e := make([]string, 2) // 创建一个初始长度为2的切片
	e = []string{"e1", "e2"}
	fmt.Println(&e[1]) // 3. 对切片索引操作进行寻址操作 0xc0000b8030

	type F struct {
		a string
		b int
	}
	fmt.Println(&F{"a", 1}) // 4.对结构体字面量进行寻址操作 &{a 1}
	var f F = F{"b", 123}
	fmt.Println(&f.a) // 5. 对结构体的字段选择进行寻址操作 0xc0000a4048

	var g = [3]int{1, 2, 3}       // 创建一个数组
	fmt.Println(&g[0])            // 6. 对数组的索引操作进行寻址操作 0xc0000ba000
	fmt.Println(&[3]int{4, 5, 6}) // 7. 对数组字面量进行寻址操作 &[4 5 6]

	// var h *int = nil
	// fmt.Println(*h)  // 会导致一个运行时错误：panic: runtime error: invalid memory address or nil pointer dereference
	// fmt.Println(&*h) // 会导致一个运行时错误：panic: runtime error: invalid memory address or nil pointer dereference

	var i int = 1
	fmt.Println("i的地址", &i) // i的地址 0xc000016098

	increase(i)           // 函数内部i的地址 0xc0000160b0
	fmt.Println("i的值", i) // i的值 1

	increaseV1(&i)        // 函数内部拿到的i的地址 0xc000016098
	fmt.Println("i的值", i) // i的值 2
}

func increase(i int) {
	fmt.Println("函数内部i的地址", &i)
	i++
}

func increaseV1(ptrI *int) {
	fmt.Println("函数内部拿到的i的地址", &*ptrI)
	*ptrI++
}
