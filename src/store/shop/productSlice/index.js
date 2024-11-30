import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mockProducts } from "./mockData";


const initialState = {
    isLoading: false,
    productList: mockProducts,
};

export const fetchAllProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async () => {
        const result = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/shop/products/get)`);
        console.log(result);
        
        
        return result?.data;
    }
);

const shoppingProductSlice = createSlice({
    name: "shoppingProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.products = [];
            });
    }
});

export default shoppingProductSlice.reducer;