package main

import (
	"fmt"
	"math/rand"
	"slices"
	"strings"
)

const (
	FAITH_THRESHOLD     = 75
	CORRUPTION_THRSHOLD = 8000000
)

func calculatePotentialCorruption(projectValue int32, corruptionRatio float32, faithValue int) (float32, bool) {
	var corruptionValue float32
	isKoreaKorea := false

	if faithValue >= FAITH_THRESHOLD {
		return 0, isKoreaKorea
	}

	denominator := corruptionRatio - float32(faithValue)
	if denominator <= 0 {
		denominator = 0.01
	}

	corruptionValue = float32(projectValue) / denominator

	maxCorruption := float32(projectValue) * 0.85
	if corruptionValue > maxCorruption {
		corruptionValue = maxCorruption
		isKoreaKorea = true
	}
	return corruptionValue, isKoreaKorea
}

// function Named Return Values
func detectOrmasByHistory(history []string) (ormas string) {
	fmt.Println(history, slices.Contains(history, "agama"))
	if slices.Contains(history, "indosat") || slices.Contains(history, "banteng") || slices.Contains(history, "nasbung") {
		ormas = "PDI-PEPE"
	} else if slices.Contains(history, "nasbung") || slices.Contains(history, "hajatan") || slices.Contains(history, "parkir") || slices.Contains(history, "TNI") {
		ormas = "PP"
	} else if slices.Contains(history, "agama") || slices.Contains(history, "habib") || slices.Contains(history, "ahok") || slices.Contains(history, "212") || slices.Contains(history, "izin gereja") {
		ormas = "FPI"
	} else if slices.Contains(history, "agama") || slices.Contains(history, "tambang") || slices.Contains(history, "gus") {
		ormas = "NGANU"
	} else if slices.Contains(history, "agama") || slices.Contains(history, "ahok") || slices.Contains(history, "anies") {
		ormas = "KADRUN"
	} else if slices.Contains(history, "oligarki") || slices.Contains(history, "kongkalikong") || slices.Contains(history, "Ijazah palsu") || slices.Contains(history, "oslo") {
		ormas = "TERMUL"
	}
	return ormas
}

func decidedNextPres(history []string) (string, string) {
	ormas := detectOrmasByHistory(history)
	var nextPress string
	fmt.Println(ormas)
	switch ormas {
	case "PDI-PEPE":
		if slices.Contains(history, "bokef") {
			nextPress = "Ganjar"
		} else {
			nextPress = "Mega chan"
		}
	case "KADRUN":
	case "FPI":
		nextPress = "Abah"
	case "NGANU":
		nextPress = "Imin imin"
	case "TERMUL":
		nextPress = "Fufufafa"
	case "ORBA":
		nextPress = "Monokotil"
	}
	fmt.Println(nextPress)
	return nextPress, ormas
}

func concatString(strs ...string) string {
	return strings.Join(strs, " ")
}

func sumAll(nums ...int) (sum int) {
	for _, num := range nums {
		sum += num
	}
	return sum
}

// function type declarations
type SUM func(nums ...int) int

func averageAll(nums []int, sumFn SUM) float32 {
	total := sumFn(nums...)
	return float32(total) / float32(len(nums))
}

func logging(message string) {
	if message == "" {
		fmt.Println(message)
	} else {
		fmt.Println("Finish called func")
	}
}

func runApplication() {
	defer logging("") // this func will running at end time
	fmt.Println("Starting application")
}

func runApplicationWithPanic(isError bool) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered from panic:", r)
		}
	}()

	if isError {
		panic("Something went wrong")
	}

	fmt.Println("Application ran successfully")
}

func main() {

	// to init go module
	// go mod init module-name

	//Type data
	fmt.Println("integer ", 1)
	fmt.Println("float ", 2.5)
	fmt.Println("Boolean ", true)
	fmt.Println("Lorem Ipsum Dolor")
	fmt.Println(len("Lorem"))
	fmt.Println("Lorem Ipsum Dolor"[5])

	// variable
	var name, address string
	var age = 62
	name = "Mulyono"
	address = "Solo"
	occupation := "Pembohonk Publik"
	//Multiple variable declaration
	var (
		firstName = name
		lastName  = "widodari"
	)

	fmt.Println("My name is", name, "I live in", address)
	fmt.Println("My age is", age)
	fmt.Println("My occupation is", occupation)
	fmt.Println("My first name is", firstName, "and the lastName is", lastName)

	//Constant
	const salary = 1000000000.00
	//Multiple Constant
	const (
		freelance_salary = 2500000.00
		brazzer_salary   = 3450000.00
	)
	fmt.Println("My salary is Rp.", salary)
	fmt.Println("My freelance salary is ", freelance_salary)
	fmt.Println("My salary as brazzery is ", brazzer_salary)
	const (
		string1 = 'a'
		int1    = 2
	)
	fmt.Println(string1, int1)

	var (
		string2          = "hideop jockowi"
		int2             = 200
		isKongKalingkong = true
	)
	fmt.Println(string2, int2, isKongKalingkong)

	//Casting between Type data and short variable declaration (:=)
	asset := 120000
	// first go will assume as untyped integer and than will chose default type int, float64, complex128
	int32Asset := int32(asset)
	int64Asset := int64(int32Asset)
	int16Asset := int16(int32Asset)
	fmt.Println("My asset is", asset)
	fmt.Println("Cast result is", int16Asset, int32Asset, int64Asset)

	name2 := "Pakdhe"
	uint8Name2 := name2[0]
	pString := string(uint8Name2)
	fmt.Println("Cast result is", pString, uint8Name2, name2)

	//Type Declarations
	type Termul string

	rajaJawa := Termul("Jock owi")
	fufuFafa := Termul("Govlan")
	superGoblin := Termul("Bahlilili")
	sawit := Termul("Prabogo")
	fmt.Println("Type Declarations", fufuFafa, rajaJawa, superGoblin, sawit)

	// Math
	var corruptionValue, corruptionRatio float32
	var isKoreaKorea bool
	var faithValue int

	himbara := 10000000000
	pertamina := 19000000000
	eKTP := 20000000000
	bansos := 35000000000

	corruptionRatio = 0.5 + rand.Float32()
	faithValue = 1 + rand.Intn(100)
	corruptionValue, isKoreaKorea = calculatePotentialCorruption(int32(himbara), corruptionRatio, faithValue)
	fmt.Println("Corruption result:", corruptionValue, "isKoreaKorea =", isKoreaKorea)

	corruptionRatio = 0.5 + rand.Float32()
	faithValue = 1 + rand.Intn(100)
	corruptionValue, isKoreaKorea = calculatePotentialCorruption(int32(pertamina), corruptionRatio, faithValue)
	fmt.Println("Corruption result:", corruptionValue, "isKoreaKorea =", isKoreaKorea)

	corruptionRatio = 0.5 + rand.Float32()
	faithValue = 1 + rand.Intn(100)
	corruptionValue, isKoreaKorea = calculatePotentialCorruption(int32(eKTP), corruptionRatio, faithValue)
	fmt.Println("Corruption result:", corruptionValue, "isKoreaKorea =", isKoreaKorea)

	corruptionRatio = 0.5 + rand.Float32()
	faithValue = 1 + rand.Intn(100)
	corruptionValue, isKoreaKorea = calculatePotentialCorruption(int32(bansos), corruptionRatio, faithValue)
	fmt.Println("Corruption result:", corruptionValue, "isKoreaKorea =", isKoreaKorea)

	// array
	var oligarkiCandidat [4]string
	oligarkiCandidat[0] = "Jock owi"
	oligarkiCandidat[1] = "Govlan"
	oligarkiCandidat[2] = "Bahlilili"
	oligarkiCandidat[3] = "Chai sang"
	fmt.Println(oligarkiCandidat)
	var locationNyawit = []string{
		"oslo",
		"papua",
	}
	fmt.Println("Lokasi Nyawit", locationNyawit)
	locationNyawit = append(locationNyawit, "sumatera")
	fmt.Println("Lokasi Nyawit", locationNyawit, len(locationNyawit))

	// array lenght 12, slice(4:7) => (pointer = 4, length = 3, capacity = 8)
	// slice[low:high] before low : after high
	// slice [low:] before low
	// slice [:high] till after hight
	// slice[:] all
	slice := oligarkiCandidat[1:3]
	fmt.Println(slice, cap(slice))
	slice[0] = "Samsul"
	slice[1] = "Bahenol (Bahlil Etanol)"
	fmt.Println(slice, cap(slice))
	fmt.Println(oligarkiCandidat)

	// diff arr and slice
	// arr := [...]int{1,2,3,2,4}
	// slice := []int{1,32,3543,43,32}

	//map
	cerdas := map[string]string{
		"bencana_banjir": "nyawit",
		"mbg_beracun":    "oknum",
		"ada_demo":       "lindes_ojol",
		"ikn":            "kota modern",
	}

	fmt.Println(cerdas["bencana_banjir"])
	fmt.Println("lenght cerdas :", len(cerdas))
	cerdas["ikn"] = "kota LC"
	delete(cerdas, "bencana_banjir")
	fmt.Println(cerdas)

	//	Switch case, If-Else, function, multiple return value
	history1 := []string{
		"agama",
		"tambang",
		"gus",
		"kyai",
	}

	// ignore another var
	//nextPress, _:= decidedNextPres(history1)
	nextPress, ormas := decidedNextPres(history1)
	fmt.Println("Next Press", nextPress, "Ormas :", ormas)

	// For loops
	counter := 1
	for counter < len(history1) {
		fmt.Println(history1[counter], counter)
		counter++
	}

	// For with Statement
	for i := 1; i < len(history1); i++ {
		if history1[i] == "agama" {
			fmt.Println(history1[i], "ups")
			break
		}
		fmt.Println("a", history1[i], i)
	}

	// For Range
	for key, cerda := range cerdas {
		fmt.Println(key, cerda)
	}

	// Variadic function
	// a function which is can pass dynamic num of params
	string3 := concatString("Bapak", "Mulyono", "Raja", "Tipu", "Tipu")
	fmt.Println(string3)

	// slice parameter
	slice2 := []string{"ayo", "ayo", "ganyang", "fufufafa", "ganyang", "fufufafa", "sekarang", "juga"}
	string4 := concatString(slice2...)
	fmt.Println(string4)

	// function value
	concatedString := concatString("Bapak", "Mulyono", "Raja", "Tipu", "Tipu")
	fmt.Println(concatedString)

	// function as parameter

	nums := []int{1, 32, 1, 41, 15, 1, 53}
	avg := averageAll(nums, sumAll)
	fmt.Println("Average:", avg)

	// Anonymous function
	isOdd := func(num int) bool {
		return num%2 == 0
	}
	fmt.Println("2 odd status", isOdd(2))
	fmt.Println("3 odd status", isOdd(3))

	// closure
	increment := func() {
		fmt.Println("increment")
		counter++
	}
	increment()

	// defer, panic, recovery
	// defer is a function that we can schedule to be executed after a function has finished executing even before is error
	runApplication()

	// panic
	// panic is a function to stop the program
	// recovery
	// recovery is a proccess panic which is will catch panic data

	runApplicationWithPanic(true)

}
