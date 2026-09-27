import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"],
        trim: true,
        maxLength: [120, "Product name should not be more than 120 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        maxLength: [5, "Product price should not be more than 5 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    image: [
        {
            public_id: {
                type: String,
                required: [true, "Please provide product photo id"],
            },
            url: {
                type: String,
                required: [true, "Please provide product photo"],
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please provide product category"],
        trim: true,
        maxLength: [100, "Product category should not be more than 100 characters"],
    },
    stock: {
        type: Number,
        required: [true, "Please provide product stock"],
        maxLength: [5, "Product stock should not be more than 5 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: [true, "Please provide reviewer's name"],
            },
            rating: {
                type: Number,
                required: [true, "Please provide review rating"],
            },
            comment: {
                type: String,
                required: [true, "Please provide review comment"],
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Product", productSchema);