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
        <div className='container mt-5 mb-3'>
            <NavComponents/>
            <div className='d-flex w-100 justify-content-between mt-5'>
                <Row xs={1} md={3} className="g-4">
                        <Col >
                            <Card bg="dark" text="white" border="primary">

                                <Card.Img variant="top" src={img1} style={{height:"300px"}} className='w-100 p-2'/>
                                <Card.Body>
                                    <Card.Title>New Pizza</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                    <Button onClick={()=> navigate("/craftPizza")} variant="outline-primary">NEW ORDER</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="dark" text="white" border="primary">
                                <Card.Img variant="top" style={{height:"300px"}} src={img2} className='w-100 p-2'/>
                                <Card.Body>
                                    <Card.Title>Favorite Pizza</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                    <Button onClick={() => navigate("/favorite")} variant="outline-primary">RE-ORDER-MY-FAV</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="dark" text="white" border="primary">
                                <Card.Img variant="top" style={{height:"300px"}} src={img3} className='w-100 p-2'/>
                                <Card.Body>
                                    <Card.Title>Random Pizza</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                    <Button onClick={() =>navigate("/random")} variant="outline-primary">SURPRISE ME</Button>

                                </Card.Body>
                            </Card>
                        </Col>
                    
                </Row>


            </div>
        </div>
    );
};

export default Home;
