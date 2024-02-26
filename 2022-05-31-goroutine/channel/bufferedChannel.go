package channel

import "fmt"

func init() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	ch <- 3 // 第9行代码
	fmt.Println(<-ch, <-ch)
}
