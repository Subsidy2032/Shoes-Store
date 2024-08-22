import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const inCart = cartItems.find(item => item.name === product.name);
        if (inCart) {
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item.name === product.name 
                        ? {...item, quantity: item.quantity + 1} 
                        : item
                )
            );
        } else {
            setCartItems((prevItems) => [...prevItems, {...product, quantity: 1}]);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
