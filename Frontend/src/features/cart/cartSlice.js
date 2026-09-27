import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//add items to cart
export const addItemsToCart = createAsyncThunk('cart/addItemToCart', async({id, quantity}, {rejectedWithValue}) => {
    try{
        const { data } = await axios.get(`/api/v1/product/${id}`);
        return {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image[0].url,
            stock: data.product.
            quantity
        }
    }catch (error){
        return rejectedWithValue(error.response?.data || 'An error occured')
    }
})

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems: [],
        loading: false,
        error: null,
        success: false,
        message: null
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        },
        removeMessage: (state) => {
            state.message= null,
        },
    },

    extraReducers : (builder) => {
        //add items to cart
        builder.addCase(addItemsToCart.pending, (state) => {
            state.loading=true;
            state.error=null;
        })
        .addCase(addItemsToCart.fulfilled, (state) => {
            const item = action.payload
            console.log(item);
        })
        .addCase(addItemsToCart.rejected, (state) => {
            state.loading = false,
            state.error = action.payload?.message || "failed to load user profile"
        })
    }
})

export const { removeErrors, removeMessage} = cartSlice.actions
export default cartSlice.reducer