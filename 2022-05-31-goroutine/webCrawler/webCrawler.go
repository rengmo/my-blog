package webcrawler

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

func init() {
	wg := &sync.WaitGroup{}
	wg.Add(1)
	go Crawl("https://golang.org/", 5, fetcher, wg)
	wg.Wait()
}

type URLs struct {
	c  map[string]bool // 用于存放表示一个链接是否被抓取过的映射
	mu sync.Mutex      // 使用互斥锁在并行的执行中进行安全的读写
}

var u URLs = URLs{
	c: make(map[string]bool),
}

// 检查链接是否已经被抓取过
func (u *URLs) IsCrawled(url string) bool {
	fmt.Printf("\n检查 %v 是否被抓取过...", url)
	u.mu.Lock()
	defer u.mu.Unlock()
	if _, ok := u.c[url]; !ok {
		fmt.Printf("...未被抓取\t")
		return false
	}
	fmt.Printf("...已被抓取\t")
	return true
}

// 将链接标记为被抓取过
func (u *URLs) Crawled(url string) {
	u.mu.Lock()
	defer u.mu.Unlock()
	u.c[url] = true
}

// 递归地请求url，直到一个最大的深度
func Crawl(url string, depth int, fetcher Fetcher, wg *sync.WaitGroup) {
	defer wg.Done()

	if depth <= 0 {
		return
	}

	if u.IsCrawled(url) {
		return
	}

	fmt.Printf("\n %v 抓取中", url)
	body, urls, err := fetcher.Fetch(url)
	u.Crawled(url)

	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("\n\t %s %q\n", url, body)

	for _, z := range urls {
		wg.Add(1)
		go Crawl(z, depth-1, fetcher, wg)
	}
}

// 模拟了网络请求，没有抓取真实的网页
type Fetcher interface {
	// Fetch返回URL的body，以及页面中找到的URLs
	Fetch(url string) (body string, urls []string, err error)
}

type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		// 随机一个时间间隔，模拟请求时耗费的时间
		timeDuration := time.Millisecond * time.Duration(rand.Intn(100))
		time.Sleep(timeDuration)
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("没有找到: %s", url)
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
