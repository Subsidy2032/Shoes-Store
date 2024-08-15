import React, {useState} from "react";
import { useEffect } from "react";
import Product from "./Product";
import { Router } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://localhost:5173/products')
           .then((res) => res.json())
           .then((data) => {
              console.log(data);
              setProducts(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

    return (
        <div>
            {products.map(product => (
                <Product 
                    name={product.name}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </div>
    );
}

export default Home;