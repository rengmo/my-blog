package main

import (
	"fmt"
	"reflect"
)

func main() {
	var a interface{} = 1
	var b interface{} = 1.11
	var c string = "aaa"

	// 将接口类型的变量运行时存储的具体的值和类型显示地获取到
	fmt.Println("type:", reflect.TypeOf(a))   // type: int
	fmt.Println("value:", reflect.ValueOf(a)) // value: 1

	fmt.Println("type:", reflect.TypeOf(nil))   // type: <nil>
	fmt.Println("value:", reflect.ValueOf(nil)) // value: <invalid reflect.Value>

	fmt.Println("type:", reflect.TypeOf(b))   // type: float64
	fmt.Println("value:", reflect.ValueOf(b)) // value: 1.11

	fmt.Println("type:", reflect.TypeOf(c))   // type: string
	fmt.Println("value:", reflect.ValueOf(c)) // value: aaa

	fmt.Println("type:", reflect.ValueOf(a).Type())     // type: int
	fmt.Println("string:", reflect.ValueOf(a).String()) // string: <int Value>
	fmt.Printf("type: %T \n", a)                        // type: int
	fmt.Printf("string: %v \n", a)                      // string: 1

	reflectA := reflect.ValueOf(a)
	fmt.Println("kind: ", reflectA.Kind()) // kind:  int

	reflectIntA := reflectA.Int()               // 返回的是 能存储有符号整数的最大类型 的值
	reflectFloatB := reflect.ValueOf(b).Float() // 返回的是 能存储浮点数的最大类型 的值

	var a1 int64 = reflectIntA
	var b1 float64 = reflectFloatB

	// var a2 int32 = reflectIntA // 会报错：cannot use reflectIntA (variable of type int64) as int32 value in variable
	// var b2 float32 = reflectFloatB // 会报错：cannot use reflectFloatB (variable of type float64) as float32 value in variable
	fmt.Println("a1: ", a1, "b1: ", b1) // a1:  1 b1:  1.11

	var a3 interface{} = reflectA.Interface()
	var a4 int = reflectA.Interface().(int) // 使用接口值的类型断言

	fmt.Println(a3, a4) // 1 1 ，因为fmt.Println接收接口类型interface{}的参数，使用 reflect.Value 拿到具体的值，所以打印出运行时的具体结果

	var d float64 = 2.222

	fmt.Println(reflect.ValueOf(d).CanSet()) // false

	reflectD := reflect.ValueOf(&d).Elem()
	fmt.Println(reflectD.CanSet()) // true
	reflectD.SetFloat(3.33)

	fmt.Println(d, reflectD) // 3.33 3.33

	type T struct {
		A int
		B string
	}
	t := T{111, "xxx"}
	s := reflect.ValueOf(&t).Elem()

	typeOfT := s.Type()
	for i := 0; i < s.NumField(); i++ { // NumField 返回结构体中的字段数量
		f := s.Field(i)
		fmt.Printf("%d: %s %s = %v\n",
			i,
			typeOfT.Field(i).Name, // 获取第i个字段的名称
			f.Type(),              // 获取第i个字段的类型
			f.Interface(),         // 将第i个字段转换回接口类型的值
		)
		// 0: A int = 111
		// 1: B string = xxx
	}

	s.Field(0).SetInt(222)      // 设置结构体的第一个字段的值
	s.Field(1).SetString("yyy") // 设置结构体的第二个字段的值
	fmt.Println(t)              // {222 yyy}

}
