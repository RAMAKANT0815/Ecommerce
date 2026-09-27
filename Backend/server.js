import express from 'express';
import app from './app.js';
import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from './config/db.js';
dotenv.config({path: './config/config.env'});




//cloudinary
connectDB()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});
const PORT = process.env.PORT || 5000;

app.get('/products', (req, res) => {
    res.status(200).send('all products');
});
app.get('/product/:id', (req, res) => {
    res.status(200).send('single product');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});