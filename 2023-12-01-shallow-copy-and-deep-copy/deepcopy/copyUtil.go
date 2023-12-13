package deepcopy

// 复制指针
// 使用 ... 是为了使函数copier作为可选参数，而不是必传的
func CopyPointer[T any](original *T, copier ...func(T) T) *T {
	if original == nil {
		return nil
	}
	var cp T
	if len(copier) > 0 {
		cp = copier[0](*original)
	} else {
		cp = *original
	}

	return &cp
}

// 复制切片
func CopySlice[T any](original []T, copier ...func(T) T) []T {
	if original == nil {
		return nil
	}

	var cs = make([]T, len(original))

	for i, val := range original {
		if len(copier) > 0 {
			cs[i] = copier[0](val)
		} else {
			cs[i] = val
		}
	}
	return cs
}

// 复制映射
func CopyMap[K comparable, V any](original map[K]V, copier ...func(V) V) map[K]V {
	if original == nil {
		return nil
	}
	cm := make(map[K]V)
	for key, val := range original {
		if len(copier) > 0 {
			cm[key] = copier[0](val)
		} else {
			cm[key] = val
		}
	}
	return cm
}

// // 拿不到类型中的类型，比如切片中每个元素的类型
// func copier[T any](val T) T {
// 	var empty T
// 	// 通过反射拿到数据的类型，比如slice、struct、map、pointer等
// 	vv := reflect.ValueOf(val)
// 	kind := vv.Kind()

// 	// 根据不同的类型选择不同的复制函数
// 	switch {
// 	case kind == reflect.Slice:
// 		if vv.Len() == 0 {
// 			return empty
// 		}
// 		vvItem := vv.Index(0)
// 		// 拿到元素的类型
// 		// reflect.TypeOf(vvItem) is not a typecompilerNotAType
// 		// func reflect.TypeOf(i any) reflect.Type
// 		return CopySlice[reflect.TypeOf(vvItem)](val)
// 	case kind == reflect.Struct:
// 		return CopyStruct(val)
// 	case kind == reflect.Pointer:
// 		return CopyPointer(val)
// 	case kind == reflect.Map:
// 		return CopyMap(val)
// 	default:
// 		return val
// 	}
// }
