package main

import "fmt"

func main() {
	// 初始化一个值类型为整数，容量为3的lru缓存
	lru := NewLRUCache[int](3)
	lru.Set("a", 2)
	lru.Set("b", 1)
	lru.Set("c", 2)
	lru.Set("d", 1)

	// 此时键a已经被删掉了
	_, err := lru.Get("a")
	if err != nil {
		fmt.Println(err)
	}
	lru.PrintNodes() // b:1 c:2 d:1

	lru.Set("e", 2)
	lru.Set("f", 3)

	lru.PrintNodes() // d:1 e:2 f:3
}

// 双向链表中的节点
type DoubleListNode[T any] struct {
	Key  string
	Val  T
	Next *DoubleListNode[T]
	Prev *DoubleListNode[T]
}

// 创建链表节点，相当于类中的构造函数
func NewDoubleListNode[T any](key string, val T) DoubleListNode[T] {
	dln := DoubleListNode[T]{
		Key: key,
		Val: val,
	}
	return dln
}

type LRUCache[T any] struct {
	Head     *DoubleListNode[T]
	Tail     *DoubleListNode[T]
	Map      map[string]*DoubleListNode[T]
	Capacity int
}

// capacity 表示缓存中最多存放多少个数据项
func NewLRUCache[T any](capacity int) LRUCache[T] {
	var empty T
	nodeMap := make(map[string]*DoubleListNode[T])
	// 初始化双向链表
	head := NewDoubleListNode[T]("head", empty)
	tail := NewDoubleListNode[T]("tail", empty)
	head.Next = &tail
	tail.Prev = &head

	// 初始化lru缓存
	lru := LRUCache[T]{
		Head:     &head,
		Tail:     &tail,
		Map:      nodeMap,
		Capacity: capacity,
	}
	return lru
}

// 向缓存中放入数据
func (lru *LRUCache[T]) Set(key string, val T) {
	node, ok := lru.Map[key]
	if ok {
		// 如果缓存中已经存在这个键，就将这个键移动到链表的末尾
		lru.moveToTail(node, val)
	} else {
		// 已经达到容量限制了，就删除链表的第一个节点
		if len(lru.Map) == lru.Capacity {
			td := lru.Head.Next
			lru.deleteNode(td)

			delete(lru.Map, td.Key)
		}
		// 缓存中不存在这个键，就将这个键添加到链表的末尾
		// 并在map中新增这个键
		node := NewDoubleListNode[T](key, val)
		lru.insertToTail(&node)
		lru.Map[key] = &node
	}
}

// 从缓存中获取数据
func (lru *LRUCache[T]) Get(key string) (T, error) {
	node, ok := lru.Map[key]
	// 映射中不存在这个值，就返回这个类型的空值
	if !ok {
		var empty T
		return empty, fmt.Errorf("key not exist")
	}
	// 将这个节点移动到链表的尾部，并返回节点的值
	lru.moveToTail(node, node.Val)
	return node.Val, nil
}

// 打印节点的内容
func (lru *LRUCache[T]) PrintNodes() {
	list := lru.Head
	node := list.Next
	for node.Key != "tail" {
		fmt.Printf("%v:%v ", node.Key, node.Val)
		node = node.Next
	}
	fmt.Println("")
}

// 给节点赋新值，并移动到尾部
func (lru *LRUCache[T]) moveToTail(node *DoubleListNode[T], newVal T) {
	lru.deleteNode(node)
	node.Val = newVal
	lru.insertToTail(node)
}

// 删除节点
func (lru *LRUCache[T]) deleteNode(node *DoubleListNode[T]) {
	node.Prev.Next = node.Next
	node.Next.Prev = node.Prev
}

// 将节点放到链表尾部
func (lru *LRUCache[T]) insertToTail(node *DoubleListNode[T]) {
	lru.Tail.Prev.Next = node
	node.Prev = lru.Tail.Prev
	node.Next = lru.Tail
	lru.Tail.Prev = node
}
