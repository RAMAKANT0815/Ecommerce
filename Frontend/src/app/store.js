import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice'
import userReducer from '../features/user/userSlice'
import adminReducer from '../features/admin/adminSlice'



export const store = configureStore({
    reducer:{
        product:productReducer,
        user:userReducer,
        admin: adminReducer
    }
})