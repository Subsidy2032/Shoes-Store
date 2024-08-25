import React, { useState, useEffect } from "react";
import Product from "./Product";
import styles from"./Home.module.css";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5173/api/products')
           .then((res) => res.json())
           .then((data) => {
              setProducts(data.products);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

    return (
        <div className={styles.container}>
            <div className= {styles.productGrid}>
                {products.length === 0 ? <p>No products available</p> : products.map(product => (
                    <Product key= {product.id}
                    name={product.name}
                    image={product.image}
                    description={product.Description}
                    price={product.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
