import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mockProducts } from "./mockData";



const initialState = {
    isLoading: false,
    productList: [],
    totalProduct: 0,
};



export const fetchAllFilteredProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async ({ filterParams, sortParams, currentPage, productsPerPage }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sort: sortParams,
            page: currentPage,
            rowsPerPage: productsPerPage,
        })
        
        const result = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/get?${query}`);
        // console.log(result.data);
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
                state.productList = action.payload.products;
                state.totalProduct = action.payload.totalProducts;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    }
});

export default shoppingProductSlice.reducer;