import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
      });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
};
    const loginHandler = (e) => {
        e.preventDefault();
        console.log(userLogin);
        axios.post("http://localhost:5000/api/login", userLogin,{withCredentials:true})

            .then((res) => {
                window.localStorage.setItem("userId",res.data._id);
                console.log("this is res data",res.data);
                navigate("/home");
            })
            .catch((err) => {
                console.log("*************************************");
                console.log(err.response.data);
                setErrors(err.response.data);
            });
    };
    return (
        <div>
            <form onSubmit={loginHandler}  style={{boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}  className='col-4 mx-auto mt-5 p-4 rounded-5 user-form text-primary'>
                {
                    errors.message ?
                        <p className='text-danger'>{errors.message}</p>
                        : null
                }
                <label htmlFor='email' className='form-label'>Email:</label>
                <input className='form-control' type="text" name='email'  onChange={ handleChange} value={userLogin.email} />

                <label htmlFor='password' className='form-label'>Password:</label>
                <input className='form-control' type="password" name='password' onChange={ handleChange} value={userLogin.password} />

                <button className='btn btn-outline-primary col-12 mt-3 mb-3'>Login</button>
                <br />
                <Link className=' ' to="/register">Dont have an account? click here to sign up</Link>
            </form>
        </div>
)}

export default Login;