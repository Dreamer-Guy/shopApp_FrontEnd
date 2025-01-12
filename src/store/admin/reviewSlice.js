import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductsWithReviews = createAsyncThunk(
    'adminReview/getProductsWithReviews',
    async ({ page, limit, status }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/reviews/products?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`,
            {withCredentials:true}
        );
        return response.data;
    }
);

export const getProductReviewDetails = createAsyncThunk(
    'adminReview/getProductReviewDetails',
    async ({ productId, page = 1, limit = 10 }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/reviews/product/${productId}?page=${page}&limit=${limit}`,
            {withCredentials:true}
        );
        return response.data;
    }
);

export const replyToReview = createAsyncThunk(
    'adminReview/replyToReview',
    async ({ reviewId, content }) => {
        const admin = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post(
            `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/reviews/${reviewId}/reply`, 
            { 
                content,
                adminId: admin._id
            },
            {withCredentials:true}
        );
        return response.data;
    }
);

const reviewSlice = createSlice({
    name: 'adminReview',
    initialState: {
        currentProduct: null,
        productReviews: [],
        loading: false,
        error: null,
        stats: {
            total: 0,
            pending: 0,
            totalPages: 0,
            currentPage: 1
        }
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
            state.productReviews = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // get product list 
            .addCase(getProductsWithReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsWithReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getProductsWithReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // get product review details
            .addCase(getProductReviewDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductReviewDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload.product;
                state.productReviews = action.payload.reviews;
                state.stats = action.payload.stats;
            })
            .addCase(getProductReviewDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // reply to review
            .addCase(replyToReview.fulfilled, (state, action) => {
                const updatedReview = action.payload;
                state.productReviews = state.productReviews.map(review => 
                    review._id === updatedReview._id ? updatedReview : review
                );
            });
    }
});

export const { setCurrentPage, clearCurrentProduct } = reviewSlice.actions;
export default reviewSlice.reducer;
