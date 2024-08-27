// Ron Bitan (ID:315924316) && Noam Muchnik (ID:212472484)

const express = require('express');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json()); // Middleware to parse JSON body

client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
    
    const db = client.db('webdev2024');
    const collection = db.collection('final_noam_ron');

    // POST request to add new user to the database
    app.post('/api/order', async (req, res) => {
        let name = req.body.name.trim();
        let phone = req.body.phone.trim();
        let email = req.body.email.trim();
        let address = req.body.address;
        let customer = { name: name, phone: phone, email: email, address: address };
        
        let order_date = new Date();
        let shipping_method = req.body.shipping_method;
        let products = req.body.products;

        let emailValid = function(email) {
            const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/;
            return regex.test(email);
        }

        let phoneValid = function(phone) {
            const regex = /^[0-9]{9,10}$/;
            return regex.test(phone);
        }

        let messages = [];

        for (let product of products) {
            if (product.quantity < 1) {
                messages.push('Quantity of products must be at least 1');
            }
        }

        let total_price = 0;

        total_price = shipping_method.toLowerCase() === "fast" ? total_price + 5 : total_price;

        if (!phoneValid(phone)) {
            messages.push('Phone number must be between 9-10 digits');
        }

        if (!emailValid(email)) {
            messages.push('Invalid email address');
        }

        if (name === "") {
            messages.push('Name field must not be empty');
        }

        if (!address || !address.line || !address.street || !address.city || !address.country) {
            messages.push('All address fields must be filled');
        }

        if (products.length < 1) {
            messages.push('Cart cannot be empty');
        }

        if (messages.length > 0) {
            return res.status(400).json({ success: false, message: messages });
        }

        const updatedProducts = [];

        for (const product of products) {
            const dbProduct = await db.collection('products_noam_ron').findOne({ name: product.name });

            if (!dbProduct) {
                return res.status(400).json({ success: false, message: `Product ${product.name} not found` });
            }

            dbProduct.quantity = product.quantity;
            updatedProducts.push(dbProduct);
        }

        for (let product of products) {
            total_price += product.unit_price * product.quantity;
        }

        let order = {
            customer, order_date, shipping_method, updatedProducts, total_price
        };

        try {
            const result = await collection.insertOne(order);
            let order_id = result.insertedId;
            res.status(201).json({ success: true, message: 'Order added successfully', order_id: order_id });
        } catch (err) {
            console.error('Error adding order', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    });

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
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
