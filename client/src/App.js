import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import Register from "./Pages/Register";
import Login from './Pages/Login';
import styled, { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import CreatePizza from './Components/CreatePizza';
import Home from './Pages/Home';
import DisplayAllOrders from './Pages/DisplayAllOrders';
import RandomPizza from './Components/RandomPizza';
import FavoritePizza from './Components/FavoritePizza';
import Account from './Pages/Account';
const LightTheme = {
  background: '#fff',
  text: '#333',
};

const DarkTheme = {
  background: '#333',
  text: '#fff',
};

const ToggleButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
`;


function App() {
  const [theme, setTheme] = useState(() => {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : LightTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme === LightTheme ? DarkTheme : LightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    // Apply the current theme on initial render
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
  }, [theme]);
  return (
    <ThemeProvider theme={theme}>
    <div className=" min-vh-100 pb-5">
          {/* <ToggleButton className='btn btn-outline-primary' onClick={toggleTheme}>
        {theme === LightTheme ? '☾' : '☀ '}
      </ToggleButton>
     */}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/account' element={<Account />} />
        <Route path="/allOrders" element={<DisplayAllOrders/>} />
        <Route path="/craftPizza" element={<CreatePizza/>} />
        <Route path="/favorite" element={<FavoritePizza/>} />
        <Route path="/random" element={<RandomPizza/>} />
      </Routes>

      </div>
    </ThemeProvider>  );
}

export default App;
