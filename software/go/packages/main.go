package main

import (
	// "container/list"
	// "container/ring"
	"errors"
	"flag"
	"fmt"
	"math"
	"os"

	// "time"
	"reflect"
	"regexp"
)

// Error
var (
	ValidationError = errors.New("validation error")
	DatabaseError   = errors.New("database error")
)

// OS
func getOSInfo() string {
	return fmt.Sprintf("Operating System: %s, Architecture: %s", os.Getenv("OS"), os.Getenv("PROCESSOR_ARCHITECTURE"))
}

// Flag
func initDatabaseConnection() {
	host := flag.String("host", "localhost", "Database host")
	user := flag.String("user", "root", "Database user")
	password := flag.String("password", "", "Database password")
	flag.Parse()
	fmt.Printf("Connecting to database at %s with user %s and password %s\n", *host, *user, *password)
}

// Math
func calculateCircleArea(radius float64) float64 {
	return math.Pi * math.Pow(radius, 2)
}

// Sort
type Person struct {
	Name string `required:"true" json:"name"`
	Age  int
}

type ByAge []Person

func (a ByAge) Len() int      { return len(a) }
func (a ByAge) Swap(i, j int) { a[i], a[j] = a[j], a[i] }

func (a ByAge) Less(i, j int) bool {
	return a[i].Age < a[j].Age
}

func isValid(data interface{}) bool {
	v := reflect.TypeOf(data)
	fmt.Printf("Type of data: %s\n", v)
	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		if field.Tag.Get("required") == "true" {
			return reflect.ValueOf(data).Field(i).Interface() != ""
		}
	}
	return true
}

func main() {
	// // Error
	// name := "John Doe"
	// isDatabaseError := true
	// if name != "" {
	// 	fmt.Println(ValidationError)
	// }

	// if isDatabaseError {
	// 	fmt.Println(DatabaseError)
	// }

	// // OS
	// fmt.Println(getOSInfo())

	// // Flag
	// initDatabaseConnection()

	// String
	// fmt.Println(strings.ToUpper("Hello, World!"))
	// fmt.Println(strings.Contains("Hello, World!", "World"))
	// fmt.Println(strings.ReplaceAll("Hello, World!", "World", "Go"))
	// fmt.Println(strings.Split("Hello, World!", ", "))
	// fmt.Println(strings.Join([]string{"Hello", "World"}, ", "))
	// fmt.Println(strings.TrimSpace("   Hello, World!   "))
	// fmt.Println(strings.HasPrefix("Hello, World!", "Hello"))
	// fmt.Println(strings.HasSuffix("Hello, World!", "World!"))
	// fmt.Println(strings.Repeat("Go ", 3))

	// strconv
	// string to bool
	// boolean, err := strconv.ParseBool("true")
	// if err != nil {
	// 	fmt.Println("Error converting string to bool:", err)
	// } else {
	// 	fmt.Println("Converted boolean:", boolean)
	// }

	// // string to float
	// floatNum, err := strconv.ParseFloat("3.14", 64)
	// if err != nil {
	// 	fmt.Println("Error converting string to float:", err)
	// } else {
	// 	fmt.Println("Converted float:", floatNum)
	// }
	// // string to int
	// num, err := strconv.Atoi("123")
	// if err != nil {
	// 	fmt.Println("Error converting string to int:", err)
	// } else {
	// 	fmt.Println("Converted number:", num)
	// }
	// // int to string
	// str := strconv.Itoa(456)
	// fmt.Println("Converted string:", str)

	// Math
	// radius := 5.0
	// area := calculateCircleArea(radius)
	// fmt.Printf("Area of circle with radius %.2f is %.2f\n", radius, area)

	// Container
	// 1. double linked list
	// data := list.New()
	// data.PushBack(1)
	// data.PushBack(2)
	// data.PushBack(3)
	// data.PushBack("Hello")
	// data.PushBack(4.5)
	// data.PushBack(true)
	// for e := data.Front(); e != nil; e = e.Next() {
	// 	fmt.Println(e.Value)
	// }

	// // 2. circular list
	// data2 := ring.New(3)
	// data2.Value = 1
	// data2 = data2.Next()
	// data2.Value = 2
	// data2 = data2.Next()
	// data2.Value = 3

	// for i := 0; i < data2.Len(); i++ {
	// 	fmt.Println(data2.Value)
	// 	data2 = data2.Next()
	// }
	// fmt.Println("remove element")
	// data2.Unlink(1)
	// for i := 0; i < data2.Len(); i++ {
	// 	fmt.Println(data2.Value)
	// 	data2 = data2.Next()
	// }
	// // iterate with Do method
	// data2.Do(func(value interface{}) {
	// 	fmt.Println("Value in ring:", value)
	// })

	//sort
	// people := []Person{
	// 	{Name: "Alice", Age: 30},
	// 	{Name: "Bob", Age: 25},
	// 	{Name: "Charlie", Age: 35},
	// }
	// fmt.Println("Before sorting:")
	// for _, person := range people {
	// 	fmt.Printf("Name: %s, Age: %d\n", person.Name, person.Age)
	// }
	// sort.Sort(ByAge(people))
	// fmt.Println("After sorting:")
	// for _, person := range people {
	// 	fmt.Printf("Name: %s, Age: %d\n", person.Name, person.Age)
	// }

	// time
	// timeNow := time.Now()
	// fmt.Println("Current time:", timeNow.Local())
	// dateUTC := time.Date(2024, time.June, 1, 0, 0, 0, 0, time.UTC)
	// fmt.Println("Current date:", dateUTC.Local())

	// parse, _ := time.Parse("2006-01-02", "2024-06-01")
	// fmt.Println("Parsed date:", parse.Local())

	// // duration
	// duration := time.Since(parse)
	// fmt.Printf("Duration since parsed date: %v\n", duration)

	// reflect
	// ppl := Person{Name: "Alice", Age: 30}
	// pplType := reflect.TypeOf(ppl)
	// fmt.Println("Type of Person struct:", pplType)
	// pplValue := reflect.ValueOf(ppl)
	// fmt.Println("Value of Person struct:", pplValue)
	// pplField := pplType.Field(0)
	// fmt.Printf("Field name: %s, Field type: %s\n", pplField.Name, pplField.Type)

	// // reflect on struct tags
	// pplTag := pplType.Field(0).Tag.Get("required")
	// fmt.Printf("Field tag: %s\n", pplTag)

	// // validate struct using tags
	// if isValid(ppl) {
	// 	fmt.Println("Person struct is valid")
	// } else {
	// 	fmt.Println("Person struct is invalid")
	// }

	// regexp
	var regex = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	fmt.Println("Is valid email:", regex.MatchString("john@example.com"))

}
