package mutex

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func init() {
	counter := Counter{
		val: make(map[string]int),
	}

	wg.Add(100)
	for i := 0; i < 100; i++ {
		go counter.Increase("somekey")
	}

	wg.Wait()
	fmt.Println(counter.Value("somekey"))
}

type Counter struct {
	mu  sync.Mutex
	val map[string]int
}

func (c *Counter) Increase(key string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	defer wg.Done()

	c.val[key]++
}

func (c *Counter) Value(key string) int {
	// 这里也可以换成用RWMutex，只锁写，不锁读
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.val[key]
}
