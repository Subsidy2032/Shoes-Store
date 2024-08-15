import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css"

function NavBar () {
    return (
        <div className={styles.navbar}>
            <nav>
                <ul className={styles.ul}>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;