package channel

import (
	"fmt"
)

func init() {
	s := []int{7, 2, 8, -9, 4, 0}
	c := make(chan int)
	mid := len(s) / 2
	go sum(s[:mid], c) // 计算[7, 2, 8]的和
	go sum(s[mid:], c) // 计算[-9, 4, 0]的和
	x, y := <-c, <-c
	fmt.Println(x, y, x+y)
}

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum
}
