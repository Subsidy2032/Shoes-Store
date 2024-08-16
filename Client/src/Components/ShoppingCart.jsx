import React, { useState } from "react";
import styles from "./ShoppingCart.module.css"; // Assume you create this file

function ShoppingCart() {
    return (
        <div className={styles.cart}>
            <h2>Your Shopping Cart</h2>
            <p>No items in the cart</p> {/* You can dynamically render items here */}
        </div>
    );
}

export default ShoppingCart;
