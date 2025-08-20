// This component creates a context of the cart to pass its contents between components

import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create the context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Define the cart contents based on the 'cart' cookie
    const [cartItems, setCartItems] = useState(() => {
        const cookieCart = Cookies.get('cart');
        return cookieCart ? JSON.parse(cookieCart) : [];
    });

    const saveCartToCookies = (cart) => {
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Cart cookie will last for 7 days
    };

    // Clear the 'cart' cookie
    const clearCart = () => {
        setCartItems([]);
        Cookies.remove('cart');
    };

    // Add a new product to the cart and set the cart cookie
    const addToCart = (product) => {
        const inCart = cartItems.find(item => item.name === product.name);
        let updatedCart;
        if (inCart) { // Product exsists
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

    // Set the cart contents from the 'cart' cookie when the component mounts.
    useEffect(() => {
        const cookieCart = Cookies.get('cart');
        if (cookieCart) {
            setCartItems(JSON.parse(cookieCart));
        }
    }, []);

    // Add to the quantity of a product in the cart
    const incrementQuantity = (name) => {
        const updatedCart = cartItems.map(item =>
            item.name === name
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCartItems(updatedCart);
        saveCartToCookies(updatedCart);
    };

    // Reduce from the quantity of a product in the cart
    const decrementQuantity = (name) => {
        const updatedCart = cartItems.map(item =>
            item.name === name
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                : item
        );
        setCartItems(updatedCart);
        saveCartToCookies(updatedCart);
    };

    // Remove a product from the cart
    const removeFromCart = (name) => {
        const updatedCart = cartItems.filter(item => item.name !== name);
        setCartItems(updatedCart);
        saveCartToCookies(updatedCart);
    };

    // Return the cart context and functions to be used
    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, incrementQuantity, decrementQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
