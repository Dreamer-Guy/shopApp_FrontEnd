import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
    productDetails: {} // Cache for individual product details
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
);

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (id) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products-detail/get/${id}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetchProduct
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails[action.payload._id] = action.payload;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
