import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Order from './Components/Order';
import Purchased from './Components/Purchased';
import NotFound from './Components/NotFound';

// Component to define all the pages and the navbar
function AppRouter() {
    return (
        <div><NavBar /><Routes><Route path="/" element={<Home />} />
                <Route path="/purchased"element={<Purchased />} />
                <Route path="/home"element={<Home />} />
                <Route path="/order"element={<Order />} />
                <Route path="*"element={<NotFound />} />
            </Routes></div>
    );
}

export default AppRouter;