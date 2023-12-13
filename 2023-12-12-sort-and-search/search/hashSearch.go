package searchdata

func init() {
	// ht := NewHashTable[string, int]()
	// ab := "ab"
	// ba := "ba"
	// c := "c"
	// d := "d"
	// e := "e"
	// ht.Put(&ab, 5)
	// ht.Put(&ba, 6)
	// ht.Put(&c, 9)
	// ht.Put(&d, 8)
	// fmt.Println(ht.GetKeys(), ht.Vals)
	// found, val := ht.Get(&c)
	// fmt.Printf("键是否存在 %v 对应的值是 %v\n", found, val)
	// found1, val1 := ht.Get(&e)
	// fmt.Printf("键是否存在 %v 对应的值是 %v\n", found1, val1)
}

type HashTable[K string, V any] struct {
	Size int  // 初始容量
	Keys []*K // 存储键
	Vals []V  // 存储值
	Len  int  // 键值对的个数
}

// 为了简化流程，只支持字符串类型的键值，假如需要扩展其他类型，可以修改类型参数
func NewHashTable[K string, V any]() HashTable[K, V] {
	size := 3 // 容器的初始尺寸设置为3
	ht := HashTable[K, V]{
		Size: size,
		Keys: make([]*K, size), // 这里为了区分空值和值不存在的情况，使用的指针类型的数据，这样的设计有些奇怪，但是又找不到什么更好的办法
		Vals: make([]V, size),
		Len:  0, // 初始的元素个数为0
	}
	return ht
}

// 扩容
func (h *HashTable[K, V]) Resize(newSize int) {
	newKeys := make([]*K, newSize)
	newVals := make([]V, newSize)
	h.Size = newSize

	copy(newKeys, h.Keys)
	copy(newVals, h.Vals)

	h.Keys = make([]*K, newSize)
	h.Vals = make([]V, newSize)

	h.Len = 0
	for i, key := range newKeys {
		if key != nil {
			h.Put(key, newVals[i])
		}
	}
}

func (h *HashTable[K, V]) Put(key *K, val V) {
	if h.Size == h.Len { // 元素个数达到容量时，需要先进行扩容
		h.Resize(h.Size * 2)
	}

	hashVal := h.Hash(key, h.Size)
	// hashVal的位置没有值的时候直接把值放在这个位置
	if h.Keys[hashVal] == nil {
		h.Keys[hashVal] = key
		h.Vals[hashVal] = val
		h.Len += 1
	} else {
		// 如果 hashVal位置已经有值了，就继续往后找，直到找到一个空位，或者已经存储的同样名字的key
		next := h.ReHash(hashVal, h.Size)
		for h.Keys[next] != nil && h.Keys[next] != key {
			next = h.ReHash(next, h.Size)
		}
		// 有空位就将键值放在空位
		if h.Keys[next] == nil {
			h.Keys[next] = key
			h.Vals[next] = val
			h.Len += 1
		} else { // 已经有这个键就覆盖这个键对应的值
			h.Vals[next] = val
		}
	}
}

func (h *HashTable[K, V]) Hash(key *K, size int) int {
	sum := 0
	k := *key
	for _, a := range k {
		sum += int(a)
	}
	return sum % size
}

// 通过线性探测的方式来处理冲突
func (h *HashTable[K, V]) ReHash(oldHash int, size int) int {
	return (oldHash + 1) % size
}

func (h *HashTable[K, V]) Get(key *K) (found bool, val V) {
	start := h.Hash(key, len(h.Keys))

	pos := start
	// 一直往后查找，直到找到，或者找了一圈都没找到
	for h.Keys[pos] != nil {
		if h.Keys[pos] == key {
			found = true
			val = h.Vals[pos]
			return found, val
		} else {
			pos = h.ReHash(pos, len(h.Keys))
			if pos == start {
				return found, val
			}
		}
	}
	return found, val
}

func (h *HashTable[K, V]) GetKeys() []K {
	keys := []K{}
	for _, key := range h.Keys {
		if key != nil {
			keys = append(keys, *key)
		} else {
			keys = append(keys, "-")
		}
	}
	return keys
}
