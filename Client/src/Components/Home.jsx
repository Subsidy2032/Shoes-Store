import React, {useState} from "react";
import { useEffect } from "react";
import Product from "./Product";
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5173/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
           .then((data) => {
              console.log(data.products);
              setProducts(data.products);
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