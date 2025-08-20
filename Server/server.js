require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Connect to the database
client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }

    const db = client.db(process.env.DATABASE);
    const collection = db.collection(process.env.MAIN_COLLECTION);

    // POST request to add a new order to the database
    app.post('/api/order', async (req, res) => {
        // Getting order details
        let name = req.body.name.trim();
        let phone = req.body.phone.trim();
        let email = req.body.email.trim();
        let address = req.body.address;
        let customer = { name: name, phone: phone, email: email, address: address };
        
        let order_date = new Date();
        let shipping_method = req.body.shipping_method;
        let products = req.body.products;

        // Checking that the email is valid
        let emailValid = function(email) {
            const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/;
            return regex.test(email);
        }

        // Checking that the phone number is between 9-10 digits
        let phoneValid = function(phone) {
            const regex = /^[0-9]{9,10}$/;
            return regex.test(phone);
        }

        // Checking that the line number is 1-5 digits
        let lineValid = function(line) {
            const regex = /^[0-9]{1,5}$/;
            return regex.test(line);
        }

        // Preparing array for error messages
        let messages = [];

        // Checking that the quantitiy of all products is at least one
        for (let product of products) {
            if (product.quantity < 1) {
                messages.push('Quantity of products must be at least 1');
            }
        }

        // Setting the initial total price based on the delivery method
        let total_price = 0;
        total_price = shipping_method.toLowerCase() === "fast" ? total_price + 25 : total_price;

        // Checking for the validity of the fields
        if (!phoneValid(phone)) {
            messages.push('Phone number must be between 9-10 digits');
        }

        if (!emailValid(email)) {
            messages.push('Invalid email address');
        }

        if (name === "") {
            messages.push('Name field must not be empty');
        }

        if (!address || !lineValid(address.line) || !address.street || !address.city || !address.country) {
            messages.push('All address fields must be filled');
        }

        if (products.length < 1) {
            messages.push('Cart cannot be empty');
        }

        // If there are invalid fields return the error messages
        if (messages.length > 0) {
            return res.status(400).json({ success: false, message: messages });
        }
        
        // Getting all the products from the database based on the names
        const orderProducts = [];

        for (const product of products) {
            const dbProduct = await db.collection(process.env.PRODUCTS_COLLECTION).findOne({ Name: product.name });

            if (!dbProduct) {
                return res.status(400).json({ success: false, message: `Product ${product.name} not found` });
            }

            dbProduct.quantity = product.quantity;
            orderProducts.push(dbProduct);
        }

        // Calculating the total price of all products
        for (let product of orderProducts) {
            total_price += product.Price * product.quantity;
        }

        // Preparing the order details to save to the database
        let order = {
            customer, order_date, shipping_method, orderProducts, total_price
        };

        // Save the order to the database, return an error if not successful
        try {
            const result = await collection.insertOne(order);
            let order_id = result.insertedId;
            res.status(201).json({ success: true, message: 'Order added successfully', order_id: order_id });
        } catch (err) {
            console.error('Error adding order', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    });

    // Endpoint the get the products from the databae
    app.get('/api/products', async (req, res) => {
        try {
            const products = await db.collection('products_noam_ron').find().toArray();
            res.status(200).json({ success: true, products: products });
        } catch (err) {
            console.error('Error fetching products', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    });

    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
