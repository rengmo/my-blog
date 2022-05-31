package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

func main() {
	wg := &sync.WaitGroup{}
	wg.Add(1)
	go Crawl("https://golang.org/", 5, fetcher, wg)
	wg.Wait()
}

type URLs struct {
	c   map[string]bool // 用于存放表示一个链接是否被抓取过的映射
	mux sync.Mutex      // 使用互斥锁在并行的执行中进行安全的读写
}

var u URLs = URLs{c: make(map[string]bool)}

// 检查链接是否已经被抓取过
func (u URLs) IsCrawled(url string) bool {
	fmt.Printf("\n👀 Checking if %v has been crawled…", url)
	u.mux.Lock()
	defer u.mux.Unlock()
	if _, ok := u.c[url]; ok == false {
		fmt.Printf("…it hasn't\t")
		return false
	}
	fmt.Printf("…it has\t")
	return true
}

// 将链接标记为抓取过
func (u URLs) Crawled(url string) {
	u.mux.Lock()
	u.c[url] = true
	u.mux.Unlock()
}

// 递归地请求抓去url的数据，直到一个最大深度
func Crawl(url string, depth int, fetcher Fetcher, wg *sync.WaitGroup) {
	defer wg.Done()

	if depth <= 0 {
		return
	}

	if u.IsCrawled(url) == true {
		return
	}

	fmt.Printf("\n➡️ Crawling %v", url)
	body, urls, err := fetcher.Fetch(url)
	u.Crawled(url)

	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("\n\t->✅ found: %s %q\n", url, body)

	for _, z := range urls {
		wg.Add(1)

		go Crawl(z, depth-1, fetcher, wg)
	}

}

// 这个练习模拟了下网络请求，手动写了一些封装好的数据，没有爬取真实的网页
type Fetcher interface {
	// Fetch 返回 URL 的 body，以及页面中找到的URLs的切片
	Fetch(url string) (body string, urls []string, err error)
}

// fakeFetcher 是一个返回封装好的结果的 Fetcher
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		// 随机一个时间间隔，模拟请求时耗费的时间
		timeDuration := time.Millisecond * time.Duration(rand.Int31n(100))
		time.Sleep(timeDuration)
		return res.body, res.urls, nil
	}

	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher 是一个填充好数据的fakeFetcher
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
