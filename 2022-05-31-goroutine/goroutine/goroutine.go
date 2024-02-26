package goroutine

import (
	"fmt"
	"time"
)

func init() {
	go say("world")
	say("hello")
}

func say(s string) {
	for i := 0; i < 3; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Printf("%v %v %v\n", s, i, time.Now().Format("15:04:05.000000"))
	}
}
