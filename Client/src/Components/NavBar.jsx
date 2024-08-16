import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import ShoppingCart from "./ShoppingCart";

function NavBar () {
    const [cartVisible, setCartVisible] = useState(false);

    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    return (
        
        <div className={styles.navbar}>
            <nav>
                <ul className={styles.ul}>
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <button onClick={toggleCartVisibility} className={styles.cartButton}>
                            🛒
                        </button>
                    </li>
                </ul>
            </nav>
            {cartVisible && <ShoppingCart />}
        </div>
    )
}

export default NavBar;