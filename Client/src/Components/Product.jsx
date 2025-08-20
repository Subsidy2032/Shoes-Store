import React, { createContext, useContext } from "react";
import styles from "./Product.module.css";
import { CartContext } from "./CartContext";

// This component describes a product
function Product(props) {

    const { addToCart } = useContext(CartContext);

    // Adding the product to the cart when clicking the 'Add to Cart' button
    function handleClick() {
        addToCart({
            name: props.name,
            image: props.image,
            description: props.description,
            price: props.price,
        });
    }

    return(
        <div className= {styles.product}>
            <img className= {styles.productImage}
                src={props.image} alt="Can't Load Image" />
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>${props.price}</p>
            <button onClick={handleClick}>Add to Cart</button>
        </div>
    )
};

export default Product;