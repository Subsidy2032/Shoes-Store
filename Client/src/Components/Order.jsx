import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";
import styles from "./Order.module.css";
import { useNavigate } from "react-router-dom";

// Order page to make an order
function Order() {
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    
    // Navigating to the purchased page upon a successful submition of the form
    const goToPurchased = (orderId)=> {
        clearCart();
        navigate('/purchased', {state: {orderId, totalPrice}});
    }

    // Setting variables for details and messages
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [line, setLine] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [emailMessage, setEmailMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [addressMessage, setAddressMessage] = useState("");
    const [lineMessage, setLineMessage] = useState("");
    const [deliveryMessage, setDeliveryMessage] = useState("");
    const [cartMessage, setCartMessage] = useState("");

    // Checking that the email is valid
    function checkEmail(email) {
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/;
        return regex.test(email);
    }

    // Checking that the phone number is between 9-10 digits
    function checkPhone(phone) {
        const regex = /^[0-9]{9,10}$/;
        return regex.test(phone);
    }

    // Checking that the line number is 1-5 digits
    function checkLine(line) {
        const regex = /^[0-9]{1,5}$/;
        return regex.test(line);
    }

    // Setting the total price based on changes to the cart or delivery method
    useEffect(() => {
        let setTotal = 0;
        cartItems.forEach(product => {
            setTotal += product.price * product.quantity;
        });

        if(deliveryMethod === "Fast"){
            setTotal += 25;
        }
        
        setTotalPrice(setTotal);
    }, [cartItems, deliveryMethod]);

    // Handling the submittion of the form
    function handleSubmit(e) {
        e.preventDefault();

        // Checking that the form is valid
        if(!validateForm()) {
            return;
        }

        // Preparing the parameters to send to the server
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": name,
                "phone": phone,
                "email": email,
                "address": { "line": line, "street": street, "city": city, "country": country },
                "shipping_method": deliveryMethod,
                "products": cartItems})
        };
        
        // Making the post request to the server
        fetch('/api/order', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    goToPurchased(data.order_id);
                } else {
                    // Handle errors
                    console.error("Error: ", data.message);
                    setCartMessage("Something went wrong");
                }
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    // Function to check that the details are valid
    function validateForm() {
        setEmailMessage("");
        setPhoneMessage("");
        setNameMessage("");
        setAddressMessage("");
        setLineMessage("");
        setDeliveryMessage("");
        setCartMessage("");

        let valid = true;

        // Checking that the cart isn't empty
        if(cartItems.length <= 0) {
            setCartMessage("Cart Cannot Be Empty!s");
            valid = false;
        }

        // In case the cart isn't empty, checking that there is no zero or negative quantities
        else {
            for (let product of cartItems) {
                if (product.quantity < 1) {
                    setCartMessage('Must Have At Least One of All Products');
                    valid = false;
                    break;
                }
            }
        }

        // Checking the validity of other fields
        if(!name) {
            setNameMessage("Name Field Cannot Be Empty");
            valid = false;
        }

        if(!checkEmail(email)) {
            setEmailMessage("Invalid Email Address");
            valid = false;
        }

        if(!checkPhone(phone)) {
            setPhoneMessage("Phone number must be 9-10 digits");
            valid = false;
        }

        if(!line || !street || !city || !country) {
            setAddressMessage("Address Fields Cannot Be Empty");
            valid = false;
        }

        if(!checkLine(line)) {
            setLineMessage("Line number must be 1-5 digits");
            valid = false;
        }

        if(!deliveryMethod) {
            setDeliveryMessage("Please Choose a Delivery Method");
            valid = false;
        }

        return valid
    }

    return (
        <div className={styles.container}>
            <div className={styles.products}>
                {cartItems.map((product, index) => (    
                    <div key={index} className={styles.cartItem}>
                        <img src={product.image} alt={product.name} className={styles.cartImage} />
                        <div className={styles.cartDetails}>
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Total: ${product.price * product.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Full Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name Here"/>
                </label>
                <span>{nameMessage}</span>

                <label>Email Address:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Here"/>
                </label>
                <span>{emailMessage}</span>

                <label>Phone Number:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your Phone Number Here"/>
                </label>
                <span>{phoneMessage}</span>

                <label>Address:
                    <input type="text" value={line} onChange={(e) => setLine(e.target.value)} placeholder="Enter your line number"/>
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Enter your street"/>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city"/>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country"/>
                </label>
                <span>{addressMessage}</span>
                
                <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                    <option value="">Select a Delivery Method</option>
                    <option value="Regular">Standard Shipping: (Up to 14 Days) FREE!</option>
                    <option value="Fast">Express Shipping: (Up to 3 Days) + $25</option>
                </select>
                <span>{deliveryMessage}</span>
                <span>{lineMessage}</span>

                <button type="submit">Order</button>
                <span>{cartMessage}</span>
            </form>

            <h2 className={styles.totalPrice}>Total price: {totalPrice}</h2>
        </div>
    )
}

export default Order;