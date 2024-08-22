import React, { useContext } from "react";
import styles from "./ShoppingCart.module.css";
import { CartContext } from "./CartContext";

function ShoppingCart() {

    const { cartItems } = useContext(CartContext);

    function handleClickCart() {
        incItem({
            name: props.name,
            image: props.image,
            description: props.description,
            price: props.price,
        });
    }

    return (
        <div className= {styles.cart}>
            <h2>Your Shopping Cart</h2>
            {cartItems === 0 ? (
                <p>No items in the cart</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key= {index} className= {styles.cartItem}>
                            <img src= {item.image} alt= "product" className= {styles.cartImage} />
                            <div className= {styles.cartDetails}>
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <p>{item.price}</p>
                                <button onClick={handleClickCart}>+</button>
                                </div>
                        </div>
                    ))
                )}
        </div>
    );
}

export default ShoppingCart;