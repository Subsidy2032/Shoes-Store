import React, { useContext } from "react";
import styles from "./ShoppingCart.module.css";
import { CartContext } from "./CartContext";

function ShoppingCart() {

    const { cartItems } = useContext(CartContext);

    return (
        <div className= {styles.cart}>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your Cart Is Empty!</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key= {index} className= {styles.cartItem}>
                            <img src= {item.image} alt= "product" className= {styles.cartImage} />
                            <div className= {styles.cartDetails}>
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <p>Price: {item.price}</p>
                                <p>Qty: {item.quantity}</p>
                                </div>
                        </div>
                    ))
                )}
        </div>
    );
}

export default ShoppingCart;