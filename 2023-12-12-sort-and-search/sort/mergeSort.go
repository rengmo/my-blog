package sortdata

func init() {
	// list := []int{5, 6, 9, 8, 1, 7, 2}
	// sortedList := MergeSortV1(list)
	// fmt.Printf("最终结果 %v\n", sortedList) // 最终结果 [1 2 5 6 7 8 9]
}

func MergeSort(list []int) []int {
	dst := make([]int, len(list))
	copy(dst, list)
	merge(list, dst, 0, len(list))
	return dst
}

func merge(src, dst []int, start, end int) {
	// 如果只有一个元素，直接返回
	if start+1 >= end {
		return
	}

	// 将列表从中间分为两部分，分别进行归并排序
	mid := (start + end) / 2

	merge(dst, src, start, mid) // [start, mid)
	merge(dst, src, mid, end)   // [mid, end)

	var (
		i = start
		j = mid
		k = start
	)

	// 当包含的元素个数 > 1 时，从左右两个子列表中取具体的值放到目标数组中
	for i < mid || j < end {
		/*
			如果右侧的子列表已经遍历完毕，或者
			左侧的子列表没有遍历完毕，并且左侧的子列表的元素小于右侧的子列表的元素
			将目标列表的值设置为左侧子列表的元素。
			否则，设置为右侧子列表的元素。
		*/
		if (j == end) || (i < mid && src[i] < src[j]) {
			dst[k] = src[i]
			k += 1
			i += 1
		} else {
			dst[k] = src[j]
			k += 1
			j += 1
		}
	}
}

func MergeSortV1(list []int) []int {
	length := len(list)
	src := list
	dst := make([]int, length)
	copy(dst, list)
	for seg := 1; seg < length; seg += seg {
		for start := 0; start < length; start += seg * 2 {
			mid := min(start+seg, length)
			end := min(start+seg*2, length)
			var (
				i = start
				j = mid
				k = start
			)
			for i < mid || j < end {
				if j == end || (i < mid && src[i] < src[j]) {
					dst[k] = src[i]
					k++
					i++
				} else {
					dst[k] = src[j]
					k++
					j++
				}
			}
		}
		src, dst = dst, src
	}
	return src
}

func min(num1, num2 int) int {
	if num1 < num2 {
		return num1
	}
	return num2
}
