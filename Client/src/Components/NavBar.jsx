// Navigation bar to go between the pages

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import ShoppingCart from "./ShoppingCart";
import logo from "../assets/logo.jpg"

function NavBar() {
    const [cartVisible, setCartVisible] = useState(false);

    // Setting the visibility of the cart, based on when the user clicks on the cart icon
    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    return (
        <div className={styles.navbar}>
            <nav>
                <img src={logo} alt="Logo" className={styles.logo} />
                <ul className={styles.ul}>
                    <li><Link to="/">Home</Link></li>
                    <li className={styles.cartContainer}>
                        <button onClick={toggleCartVisibility} className={styles.cartButton}>
                            🛒
                        </button>
                        {cartVisible && <ShoppingCart />}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
