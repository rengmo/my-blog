package equivalentbinarytrees

import (
	"fmt"
	"gopractice/equivalentBinaryTrees/tree"
)

func init() {
	tree1 := tree.New(1)
	tree2 := tree.New(1)
	fmt.Println(Same(tree1, tree2))
	fmt.Println(tree1, "tree1")
	fmt.Println(tree2, "tree2")
}

// 中序遍历树 t，将树中的所有值依次发送到通道中
func Walk(t *tree.Tree, ch chan int) {
	if t == nil {
		return
	}
	if t.Left != nil {
		Walk(t.Left, ch)
	}
	ch <- t.Value
	if t.Right != nil {
		Walk(t.Right, ch)
	}
}

// 判断两棵树是否包含相同的值
func Same(t1, t2 *tree.Tree) bool {
	ch1 := make(chan int, 10)
	ch2 := make(chan int, 10)

	go Walk(t1, ch1)
	go Walk(t2, ch2)

	count := 0

	for {
		if <-ch1 == <-ch2 {
			count++
			// 这里的count等于10，是因为题目要求里面随机生成的树的节点个数就是10个
			if count == 10 {
				return true
			}
		} else {
			return false
		}
	}
}
