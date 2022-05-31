package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}
	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}

type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// 使用给定的key递增计数器
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// 锁住之后，一次只能有一个goroutine可以访问映射c.v
	c.v[key]++
	c.mu.Unlock()
}

// 返回 给定key的 计数器的当前值
func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	// 锁住之后，一次只能有一个goroutine可以访问映射c.v
	defer c.mu.Unlock()
	return c.v[key]
}
