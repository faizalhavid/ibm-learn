package main

import (
	"fmt"
	"math/rand"
)

type Employee interface {
	getDepart()
}

// Empty Interface = any
// its like Object in java, for any typedata
// fmt.Println(a ...interface[])
// panic(v interface[])
// recovery() interface[]


type Departement struct {
	Name    string
	Manager string
	Address string
}

type Person struct {

	// public props
	Id      int
	Name    string
	Role    string
	Address string

	// private props
	salary float32
	// inheritance
	Departement
}

// Constructor
func NewPerson(p Person) *Person {
	return &Person{Id: p.Id, Name: p.Name, Role: p.Role, Address: p.Address, salary: p.salary}
}

// Encapsulation
func (p *Person) getSalary() float32 {
	return p.salary
}

func (p *Person) setSalary(salary float32) {
	p.salary = salary
}

// this function make Person Struct implement interface Departement
func (p Person) getDepart() string {
	return p.Departement.Name
}

func main() {

	var persons []Person

	// for i := 0; i < 5; i++ {
	persons = append(persons, Person{
		Id:      rand.Int(),
		Name:    "Jokowi",
		Role:    "Lead of Termul",
		Address: "Oslo",
		salary:  rand.Float32(),
		Departement: Departement{
			Name:    "Goverment",
			Manager: "Sembilan Naga",
			Address: "Jakarta",
		},
	})
	// }

	persons[0].getDepart()

	fmt.Println("Person 1 :", persons[0])

}
