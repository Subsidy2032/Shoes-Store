import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import ShoppingCart from "./ShoppingCart";
import Logo from "../assets/Logo.png";

// The navigation bar
function NavBar() {
    const [cartVisible, setCartVisible] = useState(false);
    const cartRef = useRef(null);  // Ref for the cart container
    const buttonRef = useRef(null);  // Ref for the cart button

    // Toggle cart visibility when the cart button is clicked
    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    // Close the cart if the user clicks outside of it, but not when clicking the cart button
    const handleClickOutside = (event) => {
        if (
            cartRef.current && 
            !cartRef.current.contains(event.target) && 
            !buttonRef.current.contains(event.target)
        ) {
            setCartVisible(false);
        }
    };

    useEffect(() => {
        if (cartVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cartVisible]);

    return (
        <div className={styles.navbar}>
            <nav>
                <img src={Logo} alt="Logo" className={styles.logo} />
                <ul className={styles.ul}>
                    <li><Link to="/">Home</Link></li>
                    <li className={styles.cartContainer}>
                        <button 
                            onClick={toggleCartVisibility} 
                            className={styles.cartButton} 
                            ref={buttonRef}  // Attach the ref to the cart button
                        >
                            🛒
                        </button>
                        {cartVisible && (
                            <div ref={cartRef}> {/* Attach the ref to the cart container */}
                                <ShoppingCart />
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
