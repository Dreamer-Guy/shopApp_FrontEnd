import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mockProducts } from "./mockData";


const initialState = {
    isLoading: false,
    productList: mockProducts,
};

export const fetchAllFilteredProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        })
        
        const result = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/all?${query}`);
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
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                //state.productList = action.payload;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state) => {
                state.isLoading = false;
                //state.productList = [];
            });
    }
});

export default shoppingProductSlice.reducer;