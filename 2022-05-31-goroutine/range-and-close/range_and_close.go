package main

import (
	"fmt"
)

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	// 必须在遍历结束之后关闭通道
	// 否则 for i := range c 会一直等待通道关闭
	close(c)
}
