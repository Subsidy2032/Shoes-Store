// Ron Bitan (ID:315924316) && Noam Muchnik (ID:212472484)

const bcrypt = require('bcrypt');
const express = require('express');
const mongojs = require("mongojs");

const db = mongojs(
    'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024',
    ['final_noam_ron']
  );
  
const mitzinet_coll = db.collection('final_noam_ron'); 

const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Serve static files from the 'static' directory
app.use(express.static('static'));

// POST request to add new user to the database
app.post('/order', (req, res) => {
    let name = req.body.name.trim();
    let phone = req.body.phone.trim();
    let email = req.body.email.trim();
    let address = req.body.address;
    let customer = {name: name, phone: phone, email: email, address: address};
    
    let order_date = new Date();
    let shipping_method = req.body.shipping_method.trim();
    let products = req.body.products;

    console.log('Received data:');

    let emailValid = function(email) {
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/
        return regex.test(email);
    }

    let phoneValid = function(phone) {
        const regex = /^[0-9]{9,10}$/
        return regex.test(phone);
    }

    let messages = []; // Array to save all relevent error messages

    let total_price = 0;
    for (let product of products) {
        total_price += product.unit_price * product.quantity;
        if(product.quantity < 1)
            messages.push('Quantity of products must be at least 1');
    }

    total_price = shipping_method.toLowerCase() == "fast" ? total_price + 5 : total_price;

    // Adding relevent error messages to the messages array
    if(!phoneValid(phone)) {
        messages.push('Phone number must be between 9-10 digits');
    }


    if(!emailValid(email)) {
        messages.push('Invalid email address');
    }

    if(name === "") {
        messages.push('Name field must not be empty');
    }

    if (!address || !address.line || !address.street || !address.city || !address.country) {
        messages.push('All address fields must be filled');
    }

    if(products.length < 1) {
        messages.push('Cart can not be empty');
    }

    // If the messages array isn't empty, the server returns the array
    if(messages.length > 0) {
        return res.status(400).json({ success: false, message: messages });
    }

    // Preparing the client details to save to the database
    let order = {
        customer, order_date, shipping_method, products, total_price
    };

    // Attempting to insert the client to the database
    db.final_noam_ron.insertOne(order, (err, result) => {
        if (err) {
        console.error('Error adding order', err);
        return res.status(500).json({ success: false, message: 'Server error' });
        }

        let order_id = result.insertedId;
        res.status(201).json({ success: true, message: 'order added successfuly', order_id: order_id });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
