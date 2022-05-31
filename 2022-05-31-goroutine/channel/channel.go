package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func main() {
	example2()
	wg.Wait() // 等待所有goroutines执行完成
	// example3()
}

func example3() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
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

func example2() {
	chan1 := make(chan int)

	// wg.Add(1)
	go a(chan1) // 向通道中发送数字1、2

	wg.Add(1)
	go b(chan1) // 等待1秒之后，从通道中拿数据，拿到的是数字2

	fmt.Println("接收数据A", <-chan1) // 这里拿到的是数字1
}

func a(chan1 chan int) {
	// defer wg.Done()
	chan1 <- 1
	chan1 <- 2
	// chan1 <- 3
}

func b(chan1 chan int) {
	defer wg.Done()
	time.Sleep(time.Second)
	fmt.Println("接收数据B", <-chan1)
}
