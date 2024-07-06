import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserPContext } from '../Context/UserPContext';
import { useNavigate } from 'react-router-dom';
import NavComponents from '../Components/NavComponents';
import UpdateUser from '../Components/UpdateUser';


const Account = () => {
    const { user, setUser } = useContext(UserPContext);
    const idLocal = window.localStorage.getItem("userId");
    const shadow = { boxShadow: "0 0 10px rgba(0, 3, 0, 0.5)" }
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
    const deleteOrder = (e, deleteId) => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/deletePizza/${deleteId}`, { withCredentials: true })
          .then(res => {
            console.log("OK this Order has been Deleted ☠️", res.data);
            setOrders(orders.filter((order) => order._id !== deleteId));
    
          })
          .catch(err => {
            console.log(err);
            // navigate('/home');
          });
            axios.patch(`http://localhost:5000/api/updateUser/${idLocal}`, { numOrder: user.numOrder - 1 }, { withCredentials: true })
            .then((res) => {
              console.log(res.data);
              setUser(res.data);
            })
            .catch((err) => {
              console.log(err);
            }); 
      };


    return (
        <div className="mb-5">
            <NavComponents />
            <Row className='mx-auto' style={{width: "85%"}}>
            {/* update account user */}
                    <Col md={6}>
                        <UpdateUser />
                    </Col>
                    {/* last order purchased */}
                    <Col md={6} >
                        <h2 className='mt-3 text-danger text-center'>Last Orders</h2>
                        {
                            orders.map((ord) => (
                                <div>
                                    <Row>
                                        <Col md={12} className='mb-3 mt-3'>
                                            <Card key={ord._id} className='shadow' >

                                                <Card.Body>
                                                <Card.Text>{formatDate(ord.createdAt)}</Card.Text>
                                                    <Card.Text> Methode: {ord.method}, Quantity: {ord.quantity},Toppings: {ord.toppings} </Card.Text>
                                                    <Card.Text>Size:  {ord.size}</Card.Text>
                                                    <Card.Text>Crust: {ord.crust} </Card.Text>
                                                    <Card.Text className="me-auto">PRICE: {ord.totalPrice} $</Card.Text>
                                                    <hr></hr>
                                                  <div className='d-flex justify-content-between'>
                                                  <Form>
                                                        <Form.Check className='text-primary'
                                                            inline
                                                            label="Favorite"
                                                            type='checkbox'
                                                            checked={ord.isFavorite}
                                                            onChange={(e) => handleFavoriteChange(e, ord._id)}
                                                        />
                                                    </Form>    
                                                    <Button onClick={(e) =>{deleteOrder(e,ord._id)}} variant="danger">Delete</Button>
                                                  </div>
                                                
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
        </div>
    )
}

export default Account