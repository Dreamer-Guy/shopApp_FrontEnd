import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    error: null,
    cart:{
        userId:null,
        items:[],
        createdAt:null,
    },
};

const CART_BASE_URL='carts';

const getCart=createAsyncThunk(
    `/carts/get`,
    async (_,{rejectWithValue}) => {
        try{

            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/${CART_BASE_URL}/get`,
                _,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const addItemToCart=createAsyncThunk(
    `/carts/add`,
    async ({productId,quantity},{rejectWithValue}) => {
        try{

            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/${CART_BASE_URL}/add`,
                {productId,quantity},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const updateItemInCart=createAsyncThunk(
    `/carts/update`,
    async ({productId,quantity},{rejectWithValue}) => {
        try{
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/${CART_BASE_URL}/update`,
                {productId,quantity},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const removeItemFromCart=createAsyncThunk(
    `/carts/remove`,
    async (productId,{rejectWithValue}) => {
        try{

            const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/${CART_BASE_URL}/delete/${productId}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const deleteCart=createAsyncThunk(
    `/carts/delete-cart`,
    async (_,{rejectWithValue}) => {
        try{

            const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/${CART_BASE_URL}/delete-cart  `,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);



const cartSlice = createSlice({
    name: 'cart-slice',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getCart.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isLoading=false;
        })
        .addCase(getCart.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(addItemToCart.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isLoading=false;
        })
        .addCase(addItemToCart.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(updateItemInCart.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(updateItemInCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isLoading=false;
        })
        .addCase(updateItemInCart.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(removeItemFromCart.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isLoading=false;
        })
        .addCase(removeItemFromCart.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(deleteCart.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isLoading=false;
        })
        .addCase(deleteCart.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        ;
    },
});

export {getCart,addItemToCart,updateItemInCart,removeItemFromCart,deleteCart};
export default cartSlice.reducer;
