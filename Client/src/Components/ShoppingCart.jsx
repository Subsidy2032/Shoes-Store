import React, { useContext } from "react";
import styles from "./ShoppingCart.module.css";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom"

// Shopping cart component
function ShoppingCart() {

    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate()

    // Function to go to the order page when clicking the 'Proceed to Checkout' button
    const goToOrderPage = ()=> {
        navigate("/order") 
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
                                <p>Price: ${item.price}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>Total: ${item.price * item.quantity}</p>
                                <div className={styles.quantityControls}>
                                    <button onClick={() => decrementQuantity(item.name)}>-</button>
                                    <button onClick={() => incrementQuantity(item.name)}>+</button>
                                    <button onClick={() => removeFromCart(item.name)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.totalPrice}>
                        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    </div>
                    <button onClick={goToOrderPage} className={styles.checkoutButton}>
                        Proceed to Checkout
                    </button>
                    </>
                )}
        </div>
    );
}

export default ShoppingCart;