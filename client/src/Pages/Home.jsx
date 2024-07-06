import { useNavigate } from 'react-router-dom';
import React from 'react'
import {Card,Col,Row,Button} from 'react-bootstrap';
import img1 from '../Assets/pizza1.jpg';
import img2 from '../Assets/pizza2.jpg';
import img3 from '../Assets/pizza3.jpg';
import NavComponents from '../Components/NavComponents';

const Home = () => {
    const navigate= useNavigate();
    return (
        <div className='mb-3'>
            <NavComponents/>
            <div className='d-flex w-100 p-5 justify-content-between mt-2'>
                <Row xs={1} md={3} className="g-4">
                        <Col  >
                            {/* <Card bg="dark" text="white" border="primary"> */}
                            <Card bg="white">

                                <Card.Img variant="top" src={img1} style={{height:"300px"}} className='w-100'/>
                                <Card.Body>
                                    <Card.Title className='text-danger'>New Pizza</Card.Title>
                                    <Card.Text>
                                    Create your perfect pizza with fresh toppings, quantity, and crusts. Enjoy a personalized pizza delivered just the way you like it.                                    </Card.Text>
                                    <Button onClick={()=> navigate("/craftPizza")} variant="warning">NEW ORDER</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="white">
                                <Card.Img variant="top" style={{height:"300px"}} src={img2} className='w-100'/>
                                <Card.Body>
                                    <Card.Title className='text-danger'>Favorite Pizza</Card.Title>
                                    <Card.Text>
                                    Reorder your favorite pizza with ease using our app! Simply select your previous order, and we'll deliver it hot and fresh right to your door.
                                    </Card.Text>
                                    <Button onClick={() => navigate("/favorite")} variant="warning">RE-ORDER-MY-FAV</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="white">
                                <Card.Img variant="top" style={{height:"300px"}} src={img3} className='w-100'/>
                                <Card.Body>
                                    <Card.Title className='text-danger'>Random Pizza</Card.Title>
                                    <Card.Text>
                                    Order a pizza with random toppings for a fun surprise! Let us choose the ingredients and enjoy a unique and delicious pizza experience.
                                    </Card.Text>
                                    <Button onClick={() =>navigate("/random")} variant="warning">SURPRISE ME</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                    
                </Row>


            </div>
        </div>
    );
};

export default Home;
