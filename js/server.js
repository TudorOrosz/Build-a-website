// Code for email sending
require('dotenv').config({ path: '../.env' });
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    console.log("Received Raw Body:", req.body); // Debugging Line
    const { name, email, message } = req.body;
    console.log("Extracted Data:", { name, email, message });

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: "New Contact Form Submited",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // here I need to fill in some info that I obtain from the form
    };

    console.log("Sending email with the following details:", mailOptions);

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully");
        console.log("front-end works")
    } catch (error) {
        res.status(500).send("Error sending email: " + error);
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));

// Test to see if data is received to back-end
// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());  // Enable CORS for cross-origin requests
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Test endpoint to check communication between frontend and backend
// app.post("/test", (req, res) => {
//     console.log("Received data:", req.body);  // Log the request data to see if it reaches the backend
//     res.status(200).send("Test successful! Data received.");
// });

// app.listen(3000, () => console.log("Server running on port 3000"));