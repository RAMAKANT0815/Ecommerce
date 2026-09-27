import { configureStore, createReducer } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice'
import userReducer from '../features/user/userSlice'
import adminReducer from '../features/admin/adminSlice'
import cartReducer from '../features/cart/cartSlice'



export const store = configureStore({
    reducer:{
        product:productReducer,
        user:userReducer,
        admin: adminReducer,
        cart: cartReducer
    }
})