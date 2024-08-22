import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const itemQuantity = 1;

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
        
    };

    return (
        <CartContext.Provider value= {{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
