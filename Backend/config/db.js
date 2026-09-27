import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
    }
};