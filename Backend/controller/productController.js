import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFeatures from "../utils/apiFunctionality.js";
import { v2  as cloudinary } from 'cloudinary'

// Create Product
export const createProduct = handleAsyncError(async (req, res, next) => {
    let image = []
    if(typeof req.body.image ==="string"){
        image.push(req.body.image);
    }else{
        imge = req.body.image
    }
    req.body.user = req.user.id; // Assign the user ID to the product
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product: newProduct
    });
});

// Get All Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
    const resultsPerPage = 4;
    const apiFeature = new APIFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
    // Clone the query to get the count of filtered products without pagination
    const filteredQuery = apiFeature.query.clone();
    const productCount = await filteredQuery.countDocuments();  
    //calculate total pages based on filtered product count and results per page
    const totalPages = Math.ceil(productCount/resultsPerPage);

    const page = Number(req.query.page) || 1;
    if(page > totalPages && totalPages > 0){
        return next(new HandleError("Page not found", 404));
    }

    const products = await apiFeature.query;

    if(!products || products.length === 0){
        return next(new HandleError("No products found", 404));
    }
    res.status(200).json({
        success: true,
        products,
        productCount,
        totalPages,
        currentPage: page
    });
});

// Get Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedProduct) {
        return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product: updatedProduct
    });
});

// Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
        return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

// admin getting all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
}); 

// Create or Update Product Review
export const createReviewProduct = handleAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating,
        comment
    };
    const product = await Product.findById(productId);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    product.reviews.push(review);
    await product.save();
    res.status(200).json({
        success: true,
        message: "Review added successfully"
    });
});

// Get Product Reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete Product Review
export const deleteReviewProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    const reviewIndex = product.reviews.findIndex((review) => review._id.toString() === req.query.reviewId.toString());
    if (reviewIndex === -1) {
        return next(new HandleError("Review not found", 404));
    }
    product.reviews.splice(reviewIndex, 1);
    await product.save();
    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
});
