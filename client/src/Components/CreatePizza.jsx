import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserPContext } from '../Context/UserPContext';
import NavComponents from '../Components/NavComponents';
const CreatePizza = () => {
    const navigate = useNavigate();
    const shadow = { boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }
    const [method, setMethod] = useState("");
    const [size, setSize] = useState("");
    const [crust, setCrust] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [toppings, setToppings] = useState([]);
    const { user, setUser } = useContext(UserPContext);
    const idLocal = window.localStorage.getItem("userId");
    const [errors, setErrors] = useState({});
    const addTopping = (e, topping) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setToppings((prevToppings) => [...prevToppings, topping]);
        } else {
            setToppings((prevToppings) =>
                prevToppings.filter((selectedTopping) => selectedTopping !== topping)
            );
        }
    }

    // submithandler
const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/createPizza", {
        method: method,
        size: size,
        crust: crust,
        quantity: quantity,
        toppings: toppings,
    }, { withCredentials: true })
        .then((res) => {
            console.log("new pizza",res.data);
            setMethod("");
            setSize("");
            setCrust("");
            setQuantity(0);
            setToppings([]);
            setErrors({});

            axios.patch(`http://localhost:5000/api/updateUser/${idLocal}`, { numOrder: user.numOrder + 1 }, { withCredentials : true })

                .then((res) => {
                    console.log("updated user", res.data);
                    setUser(res.data);
                    navigate("/allOrders");
                })
                .catch((err) => {
                    console.log(err.response);
                });

        })
        .catch((err) => {
            console.log(err.response.data);
            if (!toppings || toppings.length === 0) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    toppings: "Toppings must choose at least one topping"
                }));
                return; 
            }
            const errorMessages = err.response?.data?.errors || {};
            setErrors(errorMessages);
    });
};


    return (
        <div className='container mb-3'>
            <NavComponents />
            <Row>
                <Col className='mx-auto' md={6}>
                    <form className=' text-primary  mx-auto mt-5 mb-3 rounded-3 p-4 gap-3' style={shadow} onSubmit={submitHandler}>
                        <Row>
                            <Col sm={12} md={12}>
                                <label htmlFor='method'>Method: </label>
                                <select name='method' className='form-select' onChange={(e) => { setMethod(e.target.value) }} value={method} aria-label="choose">
                                    <option>Choose</option>
                                    <option value="CarryOut">Carry Out</option>
                                    <option value="Delivery">Delivery</option>
                                </select>
                                {
                                    errors.method ?
                                        <p className='text-danger'>{errors.method.message}</p>
                                        : null
                                } 
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={4}>
                                <label htmlFor='size'>Size: </label>
                                <select name='size' className='form-select' value={size} onChange={(e) => { setSize(e.target.value) }}>
                                    <option>Choose</option>
                                    <option value="Small">Small</option>
                                    <option value="Meduim">Meduim</option>
                                    <option value="Large">Large</option>      

                                </select>
                                {
                                    errors.size ?
                                        <p className='text-danger'>{errors.size.message}</p>
                                        : null
                                } 
                            </Col>
                            <Col sm={12} md={4}>
                                <label htmlFor='crust'>Crust: </label>
                                <select name='crust' className='form-select' value={crust} onChange={(e) => { setCrust(e.target.value) }}>
                                    <option>Choose</option>
                                    <option value="ThinCrust">ThinCrust</option>
                                    <option value="Regular">Regular</option>
                                    <option value="ThickCrust">ThickCrust</option>
                                </select>
                                {
                                    errors.crust ?
                                        <p className='text-danger'>{errors.crust.message}</p>
                                        : null
                                } 
                            </Col>
                            <Col sm={12} md={4}>
                                <label htmlFor='quantity'>Qty: </label>
                                <input type=" number" name='quantity' className='form-select' value={quantity}  onChange={(e) => { setQuantity(e.target.value) }}/>
                               
                            </Col>
                        </Row>
                        <Row>
                            <label htmlFor='toppings' className='mt-3 mb-3'>Toppings: </label>
                              {
                                    errors.toppings ?
                                        <p className='text-danger'>{errors.toppings}</p>
                                        : null
                                } 
                            <Col sm={12} md={6}>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Pepperoni")}
                                        onChange={(e) => addTopping(e, "Pepperoni")}
                                        id= {"Pepperoni"}
                                    />
                                    <label className="form-check-label" htmlFor="Pepperoni">
                                        Pepperoni
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Chiken")}
                                        onChange={(e) => addTopping(e, "Chiken")}
                                        id= {"Chiken"}
                                    />
                                    <label className="form-check-label" htmlFor="Chiken">
                                        Chiken
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Pineapple")}
                                        onChange={(e) => addTopping(e, "Pineapple")}
                                        id = {"Pineapple"}
                                    />
                                    <label className="form-check-label" htmlFor="Pineapple">
                                        Pineapple
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Extracheese")}
                                        onChange={(e) => addTopping(e, "Extracheese")}
                                        id={"Extracheese"}
                                    />
                                    <label className="form-check-label" htmlFor="Extracheese">
                                        Extracheese
                                    </label>
                                </Row>
                            </Col>
                            <Col sm={12} md={6}>
                                <Row md={6} >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Olives")}
                                        onChange={(e) => addTopping(e, "Olives")}
                                        id={"Olives"}
                                    />
                                    <label className="form-check-label" htmlFor="Olives">
                                        Olives
                                    </label>
                                </Row>
                                <Row md={6}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Sausage")}
                                        onChange={(e) => addTopping(e, "Sausage")}
                                        id={"Sausage"}
                                    />
                                    <label className="form-check-label" htmlFor="Sausage">
                                        Sausage
                                    </label>
                                </Row>
                                <Row md={6} >
                                    <input
                                        id= {"Mushrooms"}
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Mushrooms")}
                                        onChange={(e) => addTopping(e, "Mushrooms")}
                                    />
                                    <label className="form-check-label" htmlFor="Mushrooms">
                                        Mushrooms
                                    </label>
                                </Row>
                                <Row md={6} >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={toppings.includes("Onions")}
                                        onChange={(e) => addTopping(e, "Onions")}
                                        id={"Onions"}
                                    />
                                    <label className="form-check-label" htmlFor="Onions">
                                        Onions
                                    </label>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col><button className=' col-12 mx-auto btn btn-outline-primary mt-2'>Add To Order</button></Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </div>
    )
}
export default CreatePizza;