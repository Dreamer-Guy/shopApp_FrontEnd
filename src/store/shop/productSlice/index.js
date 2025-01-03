import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mockProducts } from "./mockData";



const initialState = {
    isLoading: false,
    productList: {
        products: [],
        totalProducts: 0
    },
    error: null
};



export const fetchAllFilteredProducts = createAsyncThunk(
    'products/fetchAllFiltered',
    async ({ filterParams, sortParams, page, rowsPerPage }) => {
        try {
            let params = { ...filterParams };
            
            if (params.priceRange && Array.isArray(params.priceRange)) {
                params.priceRange = params.priceRange.join(',');
            }

            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/get`, {
                params: {
                    ...params,
                    sort: sortParams,
                    page: page,
                    rowPerPage: rowsPerPage
                },
                withCredentials: true
            });
            
            return response.data;
            
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
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