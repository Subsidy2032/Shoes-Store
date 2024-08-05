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
app.post('/mitzinet', (req, res) => {
    let name = req.body.name.trim();
    let phone = req.body.phone.trim();
    let email = req.body.email.trim();
    let address = req.body.address;
    let customer = {name: name, phone: phone, email: email, address: address};
    
    let order_date = new Date();
    let shipping_method = req.body.shipping_method.trim();
    let products = req.body.products;

    let total_price = 0;
    for (let product of products) {
        total_price += product.unit_price * product.quantity;
    }

    total_price = shipping_method.toLowerCase() == "fast" ? total_price + 5 : total_price;

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

    // Adding relevent error messages to the messages array
    if(!phoneValid(phone)) {
        messages.push('Phone number must be between 9-10 digits');
    }


    if(!emailValid(email)) {
        messages.push('Invalid email address');
    }

    if(name === "" || address === "") {
        messages.push('Name and address must not be empty');
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
        res.status(201).json({ success: true, message: 'order added successfuly', client: client });
    });
});

// DELETE request to delete a user from the database
app.delete('/mitzinet', (req, res) => {
  let email = req.body.email.trim();
  let pass = req.body.password;

  // Checking if the email is valid
  let emailValid = function(email) {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/
    return regex.test(email);
  }

  if(!emailValid(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  // Checking if the email exists
  db.mitzinet_noam_ron.findOne({ email: email }, (err, user) => {
    if (err) {
      console.error('Error finding user', err);
      return res.status(500).json({ message: 'Server error' });
    }

    console.log('Retrieved user:', user);

    if (!user) {
      return res.status(404).json({ message: "Email and password do not match or email doesn't exist" });
    }

    // Converting the password to string and hashing the password
    pass = String(pass);

    const hashedPassword = user.password;

    // Check if hashedPassword exists
    if (!hashedPassword) {
      console.error('Hashed password not found for the user');
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    // Hashing the entered password and comparing to the existing one
    bcrypt.compare(pass, hashedPassword, (err, result) => {
      if (err) {
        console.error('Error comparing passwords', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      // Incorrect password is entered
      if (!result) {
        return res.status(401).json({ success: false, message: "Email and password do not match or email doesn't exist" });
      }

      // Password matches, now delete the user
      db.mitzinet_noam_ron.remove({ email: email }, (err, result) => {
        if (err) {
          console.error('Error deleting user', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Route to check if email exists
app.get('/checkEmail', (req, res) => {
  let email = req.query.email.trim();

  // Attempting to find the email
  db.mitzinet_noam_ron.findOne({ email: email }, (err, result) => {
      if (err) {
          console.error('Error finding email:', err);
          return res.status(500).json({ exists: false });
      }
      if (result) {
          // Email exists
          return res.json({ exists: true });
      } else {
          // Email doesn't exist
          return res.json({ exists: false });
      }
  });
});