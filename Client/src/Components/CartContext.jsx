import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const cookieCart = Cookies.get('cart');
        return cookieCart ? JSON.parse(cookieCart) : [];
    });

    const saveCartToCookies = (cart) => {
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Cart cookie will last for 7 days
    };

    const clearCart = () => {
        setCartItems([]);
        Cookies.remove('cart');
    };

    const addToCart = (product) => {
        const inCart = cartItems.find(item => item.name === product.name);
        let updatedCart;
        if (inCart) {
            updatedCart = cartItems.map(item => 
                item.name === product.name 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }

        setCartItems(updatedCart);
        saveCartToCookies(updatedCart);
    };

    useEffect(() => {
        const cookieCart = Cookies.get('cart');
        if (cookieCart) {
            setCartItems(JSON.parse(cookieCart));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
