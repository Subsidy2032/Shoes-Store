import React, { useState, useEffect } from "react";

function Order(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [line, setLine] = useState();
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

    function checkEmail(email) {
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/;
        return regex.test(email);
    }

    function checkPhone(phone) {
        const regex = /^[0-9]{9,10}$/;
        return regex.test(phone);
    }

    function checkLine(line) {
        const regex = /^[0-9]{1,5}$/;
        return regex.test(line);
    }

    useEffect(() => {
        let total = 0;
        props.products.forEach(product => {
            total += product.price * product.quantity;
        });
        setTotalPrice(total);
    }, [props.products]);

    function handleSubmit(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": name,
                "phone": phone,
                "email": email,
                "address": { "line": line, "street": street, "city": city, "country": country },
                "shipping_method": deliveryMethod,
                "products": props.products})
        };
        
        fetch('http://localhost:5173/order', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data)
            })
            .catch(error => {
                console.error("Error: ", error)
            });
    }

    function handleClick() {
        let valid = true;
        if(props.products.length <= 0) {
            setCartMessage("Cart cannot be empty");
            valid = false;
        }

        else {
            for (let product of props.products) {
                if (product.quantity < 1) {
                    setCartMessage('All products must have quantity of at least one');
                    valid = false;
                    break;
                }
            }
        }

        if(!name) {
            setNameMessage("Name field cannot be empty");
            valid = false
        }

        if(!checkEmail(email)) {
            setEmailMessage("Invalid email address");
            valid = false;
        }

        if(!checkPhone(phone)) {
            setPhoneMessage("Invalid phone number");
            valid = false;
        }

        if(!line || !street || !city || !country) {
            setAddressMessage("Address fields cannot be empty");
            valid = false;
        }

        if(!checkLine(line)) {
            setLineMessage("Line must be a valid number");
            valid = false;
        }

        if(!deliveryMethod) {
            setDeliveryMessage("Must choose delivery method");
            valid = false;
        }

        if(valid) {
            handleSubmit();
        }
    }

    return (
        <div>
            <div className="products">
                {props.products.map(product => (    
                    <Product 
                        key={product.id}
                        name={product.name}
                        image={product.image}
                        description={product.Description}
                        total_price={product.price * product.quantity}
                    />
                ))}
            </div>

            <form action="submit" className="form">
                <label>Enter your name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"/>
                </label>
                <span>{nameMessage}</span>

                <label>Enter your email address:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"/>
                </label>
                <span>{emailMessage}</span>

                <label>Enter your phone number:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number"/>
                </label>
                <span>{phoneMessage}</span>

                <label>Enter your address:
                    <input type="text" value={line} onChange={(e) => setLine(e.target.value)}/>
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)}/>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
                </label>
                <span>{addressMessage}</span>
                
                <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                    <option value="">Select a delivery option</option>
                    <option value="Regular">Regular delivery</option>
                    <option value="Fast">Fast delivery (5$)</option>
                </select>
                <span>{deliveryMessage}</span>
                <span>{lineMessage}</span>
            </form>

            <h2>Total price: {totalPrice}</h2>
            <button onClick={handleClick}>Order</button>
            <span>{cartMessage}</span>
        </div>
    )
}

export default Order;