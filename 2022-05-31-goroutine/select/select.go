package main

import (
	"fmt"
	"time"
)

func main() {
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)

	var x, y time.Time
	for {
		select {
		case x, _ = <-tick:
			fmt.Println(x, "tick.")
		case y, _ = <-boom:
			fmt.Println(y, "BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}
	// c := make(chan int)
	// quit := make(chan int)
	// go func() {
	// 	for i := 0; i < 10; i++ {
	// 		fmt.Println(<-c)
	// 	}
	// 	quit <- 0
	// }()
	// fibonacci(c, quit)
}

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}
