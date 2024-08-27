import React, { useContext } from "react";
import styles from "./ShoppingCart.module.css";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom"

function ShoppingCart() {

    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate()

    const goToOrderPage = ()=> {
        navigate("/order") 
    }

    return (
        <div className= {styles.cart}>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your Cart Is Empty!</p>
                ) : (
                    <>
                    {cartItems.map((item, index) => (
                        <div key= {index} className= {styles.cartItem}>
                            <img src= {item.image} alt= "product" className= {styles.cartImage} />
                            <div className= {styles.cartDetails}>
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <p>Price: {item.price}</p>
                                <p>Qty: {item.quantity}</p>
                                </div>
                        </div>
                    ))}
                    <button onClick={goToOrderPage} className={styles.checkoutButton}>
                        Proceed to Checkout
                    </button>
                    </>
                )}
        </div>
    );
}

export default ShoppingCart;