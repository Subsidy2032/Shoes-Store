import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./OrderComplete.module.css";

function OrderComplete() {
    const location = useLocation();
    const { orderId, cartItems, totalPrice, address } = location.state || {};

    return (
        <div className={styles.container}>
            <h1>Order Completed</h1>
            {orderId ? (
                <>
                    <p>Thank you for your purchase! Your order ID is <strong>{orderId}</strong>.</p>
                    <h2>Order Summary</h2>
                    <div className={styles.products}>
                        {cartItems && cartItems.map((product, index) => (
                            <div key={index} className={styles.cartItem}>
                                <img src={product.image} alt={product.name} className={styles.cartImage} />
                                <div className={styles.cartDetails}>
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                    <p>Price: ${product.price}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Total: ${product.price * product.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2>Total Price: ${totalPrice}</h2>
                    <h3>Delivery Address</h3>
                    <p>{address.line}, {address.street}, {address.city}, {address.country}</p>
                </>
            ) : (
                <p>There was an issue with your order. Please try again.</p>
            )}
        </div>
    );
}

export default OrderComplete;





/*

import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './OrderComplete.module.css';

function OrderComplete() {
    const location = useLocation();
    const { orderId, totalPrice } = location.state || {};

    return (
        <div className={styles.container}>
            <h1>Order Complete</h1>
            <p>Your order has been placed successfully!</p>
            {orderId && (
                <>
                    <p>Order ID: {orderId}</p>
                    <p>Total Price: ${totalPrice}</p>
                </>
            )}
        </div>
    );
}

export default OrderComplete;

*/
