import React, { useState, useEffect } from "react";
import Product from "./Product";
import styles from"./Home.module.css";
import coverImage from "../assets/Cover.jpg";  // Adjust the path as needed

// Home Page
function Home() {
    const [products, setProducts] = useState([]);

    // Fetching all the products from the server to display them on the page
    useEffect(() => {
        fetch('/api/products')
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
            <div className={styles.coverImageContainer}>
                <img src={coverImage} alt="Cover" className={styles.coverImage} />
            </div>
            <div className={styles.productGrid}>
                {products.length === 0 ? <p>No products available</p> : products.map(product => (
                    <Product key={product.ID}
                    name={product.Name}
                    image={product.Image}
                    description={product.Description}
                    price={product.Price}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
