package helper

import (
	"fmt"
)

// this is cant access cause private
func moneyLaundry(asset float32, cost float32) {
	var value float32
	if asset < cost {
		value = asset / cost
	}
	fmt.Println("Cost from Money Laundry :", value)
}

func MoneyLaundry(asset, cost float32) (string, error) {
	if cost > asset {
		return "", &ValidationError{Message: "Cost melebihi asset, anda akan bangkrut"}
	}

	value := asset / cost
	return fmt.Sprintf("Money laundry berhasil, asset yang anda terima %.2f", value), nil
}
