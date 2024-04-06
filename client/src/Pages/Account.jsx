import { Col, Row, Card, Form } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserPContext } from '../Context/UserPContext';
import { useNavigate } from 'react-router-dom';
import NavComponents from '../Components/NavComponents';
import UpdateUser from '../Components/UpdateUser';


const Account = () => {
    const { user, setUser } = useContext(UserPContext);
    const idLocal = window.localStorage.getItem("userId");
    const shadow = { boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleString(undefined, options);
        return formattedDate;
    }

    //display Orders
    useEffect(() => {
        axios.get(`http://localhost:5000/api/pizzas/${idLocal}`, { withCredentials: true })
            .then((res) => {
                const filtred = res.data;
                setOrders(filtred.filter((order) => order.isPurchased === true));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    //handel change favorite
    const handleFavoriteChange = (e, orderId) => {
       
        e.preventDefault();
        axios
        .patch(`http://localhost:5000/api/updatePizza/${orderId}`, { isFavorite: e.target.checked }, {
            withCredentials: true,
        })
        .then((res) => {
            // Update state with the modified order
            setOrders(orders.map(order => ( order._id === res.data._id ? res.data : order)))
        })
        .catch((err) => console.log(err));

    };


    return (
        <container>
            <NavComponents />
                <Row className='mx-auto'>
                    {/* update account user */}
                    <Col md={6}>
                        <UpdateUser />
                    </Col>
                    {/* last order purchased */}
                    <Col md={6} >
                        <h1>Last Orders</h1>
                        {
                            orders.map((ord) => (
                                <div>
                                    <Row>
                                        <Col md={12} className='mb-3'>
                                            <Card key={ord._id} text="primary"    style={shadow}  border="primary">
                                                <Card.Body>
                                                <Card.Text>{formatDate(ord.createdAt)}</Card.Text>
                                                    <Card.Text> {ord.method}, {ord.quantity},{ord.toppings} </Card.Text>
                                                    <Card.Text> {ord.size}</Card.Text>
                                                    <Card.Text>{ord.crust} </Card.Text>
                                                    <Card.Text className="me-auto">PRICE: {ord.totalPrice}</Card.Text>
                                                    <hr></hr>
                                                    <Form>
                                                        <Form.Check
                                                            inline
                                                            label="Favorite"
                                                            type='checkbox'
                                                            checked={ord.isFavorite}
                                                            onChange={(e) => handleFavoriteChange(e, ord._id)}
                                                        />
                                                    </Form>                                                    
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            )
                            )
                        }
                    </Col>
                </Row>
        </container>
    )
}

export default Account