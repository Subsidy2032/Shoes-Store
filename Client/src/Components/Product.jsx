import React, {useState} from "react";

function Product(props) {
    function handleClick() {
        
    }

    return(
        <div className="product">
            <img src={props.image} alt="" />
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button onClick={handleClick}>+</button>
        </div>
    )
};

export default Product;