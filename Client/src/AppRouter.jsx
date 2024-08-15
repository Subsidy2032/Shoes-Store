import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import Home from './Components/Home.jsx';
import Order from './Components/Order.jsx';
import NotFound from './Components/NotFound.jsx';

function AppRouter() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/order" element={<Order/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;