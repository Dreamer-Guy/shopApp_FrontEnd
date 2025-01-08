import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mockProducts } from "./mockData";



const initialState = {
    isLoading: true,
    productList: {
        products: [],
        totalProducts: 0
    },
    error: null
};



export const fetchAllFilteredProducts = createAsyncThunk(
    'products/fetchAllFiltered',
    async (queryString) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/get?${queryString}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
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
                state.error = null;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = {
                    products: action.payload.products,
                    totalProducts: action.payload.totalProducts
                };
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.productList = {
                    products: [],
                    totalProducts: 0
                };
            });
    }
});

export default shoppingProductSlice.reducer;