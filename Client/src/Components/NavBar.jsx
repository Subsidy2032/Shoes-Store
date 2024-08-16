import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css"

function NavBar () {
    return (
        <div className={styles.navbar}>
            <nav>
                <ul className={styles.ul}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Contact</Link></li>
                    <li><Link to="/">About</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;