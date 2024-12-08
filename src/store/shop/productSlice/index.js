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
        const result = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/get`);
        console.log(result.data);
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
                state.productList = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    }
});

export default shoppingProductSlice.reducer;