package main

import (
	"fmt"
	"todolist/helper"
)

func main() {
	// package
	value, err := helper.MoneyLaundry(10000, 20000000)
	if validationErr, ok := err.(*helper.ValidationError); ok {
		fmt.Println("Validation error:", validationErr.Message)
	} else if err != nil {
		fmt.Println("Error:", err.Error())
	} else {
		fmt.Println("Value:", value)
	}

}
