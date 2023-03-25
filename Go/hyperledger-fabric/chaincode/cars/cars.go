package main

import (
	"errors"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/s7techlab/cckit/extensions/owner"
	"github.com/s7techlab/cckit/router"
	p "github.com/s7techlab/cckit/router/param"
	"time"
)

const CarEntity = `CAR`
const CarRegisteredEvent = `CAR_REGISTERED`

var Payloads = []*Car{{
	Id:    `A777MP77`,
	Title: `BMW`,
	Owner: `victor-nosov`,
}, {
	Id:    `O888OO77`,
	Title: `TOYOTA`,
	Owner: `alexander`,
}, {
	Id:    `O222OO177`,
	Title: `Lambo`,
	Owner: `hodl`,
}, {
	Id:    `E333KX177`,
	Title: `Aurus`,
	Owner: `bigboss`,
}}

// CarPayload chaincode method argument
type CarPayload struct {
	Id    string
	Title string
	Owner string
}

// Car struct for chaincode state
type Car struct {
	Id    string
	Title string
	Owner string

	UpdatedAt time.Time // set by chaincode method
}

// Key for car entry in chaincode state
func (c Car) Key() ([]string, error) {
	return []string{CarEntity, c.Id}, nil
}

func New() *router.Chaincode {
	r := router.New(`cars`) // also initialized logger with "cars" prefix

	r.Init(invokeInit)

	r.Group(`car`).
		Query(`List`, queryCars).                                             // chain code method name is carList
		Query(`Get`, queryCar, p.String(`id`)).                               // chain code method name is carGet, method has 1 string argument "id"
		Invoke(`Register`, invokeCarRegister, p.Struct(`car`, &CarPayload{}), // 1 struct argument
			owner.Only) // allow access to method only for chaincode owner (authority)

	return router.NewChaincode(r)
}

// ======= Init ==================
func invokeInit(c router.Context) (interface{}, error) {
	return owner.SetFromCreator(c)
}

// ======= Chaincode methods =====

// car get info chaincode method handler
func queryCar(c router.Context) (interface{}, error) {
	// get state entry by composite key using CarKeyPrefix and car.Id
	//  and unmarshal from []byte to Car struct
	return c.State().Get(&Car{Id: c.ParamString(`id`)})
}

// cars car list chaincode method handler
func queryCars(c router.Context) (interface{}, error) {
	return c.State().List(
		CarEntity, // get list of state entries of type CarKeyPrefix
		&Car{})    // unmarshal from []byte and append to []Car slice
}

// carRegister car register chaincode method handler
func invokeCarRegister(c router.Context) (interface{}, error) {
	// arg name defined in router method definition
	p := c.Param(`car`).(CarPayload)

	t, _ := c.Time() // tx time
	car := &Car{     // data for chaincode state
		Id:        p.Id,
		Title:     p.Title,
		Owner:     p.Owner,
		UpdatedAt: t,
	}

	// trigger event
	if err := c.Event().Set(CarRegisteredEvent, car); err != nil {
		return nil, err
	}

	return car, // peer.Response payload will be json serialized car data
		//put json serialized data to state
		// create composite key using CarKeyPrefix and car.Id
		c.State().Insert(car)
}

func NewWithoutAccessControl() *router.Chaincode {
	r := router.New(`cars_without_access_control`) // also initialized logger with "cars" prefix

	r.Group(`car`).
		Query(`List`, queryCars).                                             // chain code method name is carList
		Query(`Get`, queryCar, p.String(`id`)).                               // chain code method name is carGet, method has 1 string argument "id"
		Invoke(`Register`, invokeCarRegister, p.Struct(`car`, &CarPayload{})) // allow access to everyone
	return router.NewChaincode(r)
}

// NewProxy created chaincode, related to cars chaincode
func NewProxy(carsChannel, carsChaincode string) *router.Chaincode {
	r := router.New(`cars_proxy`) // also initialized logger with "cars_related" prefix

	r.Init(invokeInit)

	r.Query(`carGet`, queryCarProxy, p.String(`id`))

	return router.NewChaincode(r)
}

//
func queryCarProxy(c router.Context) (interface{}, error) {
	var (
		id = c.ParamString(`id`)
	)

	// query external chaincode
	response := c.Stub().InvokeChaincode(`cars`, [][]byte{[]byte(`carGet`), []byte(id)}, `my_channel`)
	if response.Status == shim.ERROR {
		return nil, errors.New(response.Message)
	}
	return response.Payload, nil
}

func main() {
	cc := New()
	if err := shim.Start(cc); err != nil {
		fmt.Printf("Error starting Cars chaincode: %s", err)
	}
}
