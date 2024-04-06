import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const Register = () => {
    const navigate = useNavigate();
    const shadow = { boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }

    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: ""
    });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        console.log("user", user);
        e.preventDefault();
        axios.post('http://localhost:5000/api/register', user, { withCredentials: true })

            .then((res) => {
                console.log("register user",res.data);
                window.localStorage.setItem("userId", res.data._id);
                console.log("userId", res.data._id);
                navigate('/home');
                setErrors([]);

            })
            .catch((err) => {
                console.log(err.response.data);
                // if (err.response.data.message) {
                    // setErrors(err.response.data);
                // } else if (err.response.data.error.errors) {
                    // setErrors(err.response.data.error.errors);
                // } else setErrors([]);
                const errorMessages = err.response?.data?.error?.errors || {};
                setErrors(errorMessages);

            });
    };
    return (
        <div >
            <Row md={2} >
                <Col className='mx-auto'>
                    <form className=' text-primary  mx-auto mt-5 rounded-3 p-4 gap-3' style={shadow} onSubmit={submitHandler}>

                        <Row>
                            <Col sm={12} md={6}>
                                <label htmlFor='firstName'>First Name: </label>
                                <input type="text" className=' mx-auto form-control ' onChange={handleChange} value={user.firstName} name='firstName' />
                                {/* {
                                    errors.firstName ?
                                        <p className='text-danger'>{errors.firstName.message}</p>
                                        : null
                                }  */}
                                {errors.firstName && (
                                    <p className="text-danger">{errors.firstName.message}</p>
                                )}
                            </Col>
                            <Col sm={12} md={6}>
                                <label htmlFor='lastName'>Last Name: </label>
                                <input type="text" className=' mx-auto form-control' onChange={handleChange} value={user.lastName} name='lastName' />
                                {/* {
                                    errors.lastName ?
                                        <p className='text-danger'>{errors.lastName.message}</p>
                                        : null
                                }  */}
                                {errors.lastName && (
                                    <p className="text-danger">{errors.lastName.message}</p>
                                )}
                            </Col>

                        </Row>


                        <Row>
                            <Col sm={12} md={6}>
                                <label htmlFor='email'>Email: </label>
                                <input type="text" className=' mx-auto form-control' onChange={handleChange} value={user.email} name='email' />
                                {
                                    errors.email ?
                                        <p className='text-danger'>{errors.email.message}</p>
                                        : null
                                }
                                {/* {errors && <p className="text-danger">{errors.message}</p>} */}

                            </Col>
                            <Col sm={12} md={6}>
                                <label htmlFor='address'>Address: </label>
                                <input type="text" className='form-control' onChange={handleChange} value={user.address} name='address' />
                                {
                                    errors.address ?
                                        <p className='text-danger'>{errors.address.message}</p>
                                        : null
                                }
                                {/* {errors.address && (
                                    <p className="text-danger">{errors.address.message}</p>
                                )} */}

                            </Col>
                        </Row>


                        <Row>
                            <Col sm={12} md={9}>
                                <label htmlFor='city'>City: </label>
                                <input type="text" className=' form-control' onChange={handleChange} value={user.city} name='city' />
                                {
                                    errors.city ?
                                        <p className='text-danger'>{errors.city.message}</p>
                                        : null
                                }
                                
                                {/* {errors.city && (
                                    <p className="text-danger">{errors.city.message}</p>
                                )} */}
                            </Col>
                            <Col sm={12} md={3}>
                                <label htmlFor='state'>State: </label>
                                <select name='state' className='form-select' onChange={handleChange} value={user.state} aria-label="Default select example">
                                    <option value="">choose</option>
                                    <option value="one">State1</option>
                                    <option value="two">State2</option>
                                    <option value="three">State3</option>
                                </select>

                                {
                                    errors.state ?
                                        <p className='text-danger'>{errors.state.message}</p>
                                        : null
                                }
                                {/* {errors.state && (
                                    <p className="text-danger">{errors.state.message}</p>
                                )} */}
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12} md={6}>
                                <label htmlFor='password'>Password: </label>
                                <input type="password" className=' mx-auto form-control' onChange={handleChange} value={user.password} name='password' />

                                {
                                    errors.password ?
                                        <p className='text-danger'>{errors.password.message}</p>
                                        : null
                                }
                                {/* {errors.password && (
                                    <p className="text-danger">{errors.password.message}</p>
                                )} */}
                            </Col>
                            <Col sm={12} md={6}>
                                <label htmlFor='confirmPassword'>Confirm Password: </label>
                                <input type="password" className=' mx-auto form-control' onChange={handleChange} value={user.confirmPassword} name='confirmPassword' />

                                {
                                    errors.confirmPassword ?
                                        <p className='text-danger'>{errors.confirmPassword.message}</p>
                                        : null
                                }
                                {/* {errors.confirmPassword && (
                                    <p className="text-danger">{errors.confirmPassword.message}</p>
                                )} */}
                            </Col>


                        </Row>
                        <Row>
                            <Col><button className=' col-12 mx-auto btn btn-outline-primary mt-2'>Register</button>
                                <Link className='' to="/">Already have an account?</Link></Col>
                        </Row>
                    </form>
                </Col>
            </Row>


        </div>
    )
}

export default Register;
