package main

import (
	"fmt"
	"time"
)

func main() {
	go say("a")
	say("b")
}

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(2 * time.Second)
		fmt.Println(s, time.Now().Format("15:04:05.000000"))
	}
}
