package main

import (
	"encoding/json"
	"fmt"
	"os"
	"reflect"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// 将注释打开可以运行相应的代码
	// databaseA()
	// jsonA()
	// jsonB()
	// embeddedA()
	// embeddedB()
	// promotedA()
	// tagA()
	// jsonC()
	// jsonD()
	// jsonE()
	jsonF()
}

type Todo struct {
	// ID        uint `gorm:"primarykey"`
	// CreatedAt time.Time
	// UpdatedAt time.Time
	// DeletedAt gorm.DeletedAt `gorm:"index"`
	gorm.Model
	Title  string
	Detail string `gorm:"column:todo_detail;comment:待办详情"`
	Done   bool   `gorm:"default:false"`
}

func databaseA() {
	dbName := "practice"
	dbUserName := "root"
	dbUserPassword := "your_database_secret"
	dbHost := "localhost"
	dbPort := "3306"
	// 用户名:密码@[连接方式](主机名:端口号)/数据库名
	// dsn 是数据源名称
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		dbUserName, dbUserPassword, dbHost, dbPort, dbName)

	// 连接数据库
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	// 连接数据库失败时抛出异常
	if err != nil {
		panic("数据库连接失败！")
	}
	fmt.Println("数据库连接成功")

	// 将代码中定义好的模式（schema）迁移到实际的数据库中，执行这句之后，数据库中就会创建好表
	db.AutoMigrate(&Todo{})
}

func jsonA() {
	type Novel struct {
		ID       uint
		Title    string
		Chapters []string
	}

	novel := Novel{
		ID:    1,
		Title: "我与掘金的二三事",
		Chapters: []string{
			"注册了账号",
			"写了一篇文",
			"又写了一篇文",
			"升级了，可以定时发送了，开森",
		},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}

	os.Stdout.Write(a)
}

func jsonB() {
	type Novel struct {
		ID       uint
		Title    string
		Chapters []string
		inited   bool
	}

	novel := Novel{
		inited: true,
		ID:     2,
		Title:  "小步慢跑",
		Chapters: []string{
			"ᕕ( ᐛ )ᕗ",
		},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}

	os.Stdout.Write(a)
}

func embeddedA() {
	type Novel struct {
		ID          uint
		Deleted     bool
		CreatedTime time.Time

		Title    string
		Chapters []string
	}

	novel := Novel{
		ID:          2,
		Deleted:     false,
		CreatedTime: time.Now(),
		Title:       "小步慢跑",
		Chapters: []string{
			"ᕕ( ᐛ )ᕗ",
		},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}

	os.Stdout.Write(a)
}

func embeddedB() {
	type Common struct {
		ID          uint
		Deleted     bool
		CreatedTime time.Time
	}

	type Novel struct {
		Common
		Title    string
		Chapters []string
	}

	common := Common{
		ID:          2,
		Deleted:     false,
		CreatedTime: time.Now(),
	}
	novel := Novel{
		Common: common,
		Title:  "小步慢跑",
		Chapters: []string{
			"ᕕ( ᐛ )ᕗ",
		},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}

	os.Stdout.Write(a)
}

func promotedA() {
	type Todo struct {
		T1
		*T2
		Title string
	}
	todo := Todo{
		Title: "写一篇小文文",
	}
	todo1 := &Todo{
		Title: "跑步10分钟",
	}
	PrintMethodSet(todo)
	PrintMethodSet(todo1)
}

type T1 struct{}

func (T1) M1() {
	fmt.Println("m1")
}
func (*T1) M2() {
	fmt.Println("m2")
}

type T2 struct{}

func (T2) M3() {
	fmt.Println("m3")
}
func (*T2) M4() {
	fmt.Println("m4")
}

// 打印类型的方法集
func PrintMethodSet(x interface{}) {
	v := reflect.ValueOf(x)
	t := v.Type()
	fmt.Printf("类型%s的方法集:\n", t)

	for i := 0; i < v.NumMethod(); i++ { // NumMethod()返回值的方法集中，可导出方法的数量
		fmt.Println(
			t.Method(i).Name, // 获取第i个方法的名称
		)
	}
}

func tagA() {
	type Todo struct {
		Title  string `gorm:""`
		Detail string `gorm:"column:todo_detail;comment:待办详情" json:"detail"`
		Done   bool   `gorm:"default:false" json:"done"`
	}
	todo := Todo{}
	t := reflect.TypeOf(todo)
	for i := 0; i < t.NumField(); i++ { // NumField返回结构体的字段的数量
		field := t.Field(i)
		fmt.Println(
			fmt.Sprintf("字段 %s 对应的标签值:  ", field.Name),
			field.Tag.Get("gorm"),
			field.Tag.Get("json")) // 获取标签中的键"gorm"和"json"对应的值
	}
}

func jsonC() {
	type Novel struct {
		ID       uint `json:"novel_id"`
		Title    string
		Chapters []string
	}

	novel := Novel{
		ID:    1,
		Title: "我与掘金的二三事",
		Chapters: []string{
			"注册了账号",
			"写了一篇文",
			"又写了一篇文",
			"升级了，可以定时发送了，开森",
		},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}

	os.Stdout.Write(a)
}

func jsonD() {
	type Novel struct {
		ID       uint `json:"novel_id"`
		Title    string
		Chapters []string `json:"novel_chapters,omitempty"`
	}

	novel := Novel{
		ID:       1,
		Title:    "我与掘金的二三事",
		Chapters: []string{},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}

	os.Stdout.Write(a)
}

func jsonE() {
	type Novel struct {
		ID       uint     `json:",omitempty"`
		Title    string   `json:"-"`
		Chapters []string `json:"-,"`
	}

	novel := Novel{
		ID:       1,
		Title:    "我与掘金的二三事",
		Chapters: []string{},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}

	os.Stdout.Write(a)
}

func jsonF() {
	type Novel struct {
		ID       uint
		Title    string
		Chapters []string
	}

	novel := Novel{
		ID:    1,
		Title: "我与掘金的二三事",
		Chapters: []string{
			"注册了账号",
		},
	}

	a, err := json.Marshal(novel)
	if err != nil {
		fmt.Println(err)
	}
	os.Stdout.Write(a)
	fmt.Println("")

	err = json.Unmarshal(a, &novel)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(novel)

	novel1JSON := []byte(`{"ID":2,"Title":"小步慢跑","Chapters":["ᕕ( ᐛ )ᕗ"]}`)
	var novel1 Novel
	err = json.Unmarshal(novel1JSON, &novel1)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(novel1)
}
