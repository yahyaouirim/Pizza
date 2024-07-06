 
import React, { useContext , useEffect} from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPContext } from '../Context/UserPContext';
import logo from '../Assets/logopizza.png';


const NavComponents = () => {
    const { user,setUser } = useContext(UserPContext);
    const navigate = useNavigate();

    const idLocal = window.localStorage.getItem("userId");
        //get logged user
        useEffect(() => {
            axios.get(`http://localhost:5000/api/loggedUser/${idLocal}`, { withCredentials: true })
                .then((res) => {
                    console.log("You are logged in");
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, [idLocal, setUser]);
    const logout = () => {
        axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true })
            .then((res) => {
                console.log(res);
                window.localStorage.removeItem("userId");
                navigate("/");
            })
            .catch((err) => {
                console.log("Error during logout:", err);
            });
    };

    return (
        <div className='mb-3' style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 3px 5px 0px"}}>
            <Navbar bg="white" expand="lg">
            <Container>
                <Navbar.Brand href="#"><img src={logo} style={{width:"200px", height:"70px"}}></img></Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">

                    <Nav className="justify-content-end gap-5 text-white fs-5 fst-italic" defaultActiveKey="/home">
                            <Nav.Link  onClick={() => navigate("/home")}>Home</Nav.Link>
                            <Nav.Link  onClick={() => navigate("/allOrders")}>Order ({user.numOrder}) </Nav.Link>
                            <Nav.Link  onClick = {() => navigate("/account")}>Account</Nav.Link>
                            <Nav.Link onClick={logout}> Logout </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        </div>       
    );
};

export default NavComponents;
