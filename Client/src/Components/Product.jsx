import React, {useState} from "react";
import styles from "./Product.module.css";



function Product(props) {
    function handleClick() {
        
    }

    return(
        <div className= {styles.product}>
            <img className= {styles.productimggg}
                src={props.image} alt= "" />
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button onClick={handleClick}>+</button>
        </div>
    )
};

export default Product;