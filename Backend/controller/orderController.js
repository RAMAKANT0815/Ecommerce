import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFeatures from "../utils/apiFunctionality.js";

export const createOrder = handleAsyncError(async(req, res) => {
    const {shippingInfo, orderItems, user, payment, paidAt, itemPrice, taxPrice, shippingPrice,  totalPrice, deliveredAt, createdAt} = req.body;
    
    const order = Order.create({
        shippingInfo, 
        orderItems, 
        user: req.user._id,
        payment, 
        paidAt: Date.now(), 
        itemPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice, 
        deliveredAt, 
        createdAt
    })
    res.status(200).json({
        success: true,
        order
    })
})

export const getSingleOrder = handleAsyncError(async(req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email"); //by using populate we get user details like we mension name email
    if(!order){
        return next(new HandleError("order not found", 404));
    }
    res.status(200).json({
        success: true,
        order
    });
})

export const getAllOrders = handleAsyncError(async(req, res) => {
    const order = await Order.find();
    let totalAmount = 0;
    order.forEach(order => {
        totalAmount+=order.totalPrice;
    })
    if(!order){
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})

export const myAllOrders = handleAsyncError(async(req, res) => {
    const order = await Order.find({user: req.user._id});

    if(!order){
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        orders
    })
})

export const updateOrderStatus = handleAsyncError(async(req, res, next) => {
    const order = Order.findById(req.body.id);
    if(!order){
        return next(new HandleError("No order found", 404));
    }
    if(order.orderStatus === "Delivered"){
        return next(new handleAsyncError("this order is already been delivered", 404));
    }

    await Promise.all(
        order.orderItems.map(item => updateQuantity(item.product, item.quantity))
    )
    order.orderStatus = req.body.status;
    if(order.orderStatus === 'Delivered'){
        order.deliveredAt=Date.now();
    }
    res.status(200).json({
        success: true,
        order
    })
})
async function updateQuantity() {
    const product = await Product.findById(id);
    if(!product){
        return next(new HandleError("product not found mkc", 404));
    }
    
}

export const deleteOrder = handleAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new HandleError("NO order found", 404));
    }
    await Order.deleteOne({_id : req.params.id});
    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})



