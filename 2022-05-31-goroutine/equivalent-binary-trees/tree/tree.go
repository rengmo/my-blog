package tree

import (
	"fmt"
	"math/rand"
)

// Tree 是一个包含整数值的二叉树
type Tree struct {
	Left  *Tree
	Value int
	Right *Tree
}

// New 会返回一个新的，包含值为k, 2k, ..., 10k的随机二叉树
func New(k int) *Tree {
	var t *Tree
	// Perm 返回半开区间 [0,n) 中整数的伪随机排列
	for _, v := range rand.Perm(10) {
		t = insert(t, (1+v)*k)
	}
	return t
}

// 将值插入树中，节点的左子树中存的值小于节点的值，右子树存的值大于等于节点的值
func insert(t *Tree, v int) *Tree {
	if t == nil {
		return &Tree{nil, v, nil}
	}
	if v < t.Value {
		t.Left = insert(t.Left, v)
	} else {
		t.Right = insert(t.Right, v)
	}
	return t
}

// 递归到左子树的最左边，使用递归依次拿最小的值，然后拿根节点的值，递归到右子树的最左边，使用递归依次拿最小的值
func (t *Tree) String() string {
	if t == nil {
		return "()"
	}
	s := ""
	if t.Left != nil {
		s += t.Left.String() + " "
	}
	s += fmt.Sprint(t.Value)
	if t.Right != nil {
		s += " " + t.Right.String()
	}
	return "(" + s + ")"
}
