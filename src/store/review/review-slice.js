import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    error: null,
    reviews: [],
    totalPages: 1,
    currentPage: 1
};

const REVIEWS_BASE_URL=`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/reviews`;

const getAllReviews=createAsyncThunk(
    `/reviews/all`,
    //add when needed
    async (id,{rejectWithValue}) => {
        try{

            const response = await axios.get(`${REVIEWS_BASE_URL}/${id}`,
                {withCredentials:true}); //send with cookie
            return response.data.reviews;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

// Add new async thunk for adding reviews
const addReview = createAsyncThunk(
    '/reviews/add',
    async (reviewData, { rejectWithValue }) => {
        try {
            const body={
                productId:reviewData.productId,
                rating:reviewData.rating,
                comment:reviewData.comment,
                isDeleted: false,
                reply: {
                    "content": null,
                    "staffId": null,
                    "createdAt": null
                },
            }
            const response = await axios.post(
                `${REVIEWS_BASE_URL}`,
                body,
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Add new async thunk for paginated reviews
const getProductReviews = createAsyncThunk(
    '/reviews/product',
    async ({productId, page, limit}, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${REVIEWS_BASE_URL}/${productId}?page=${page}&limit=${limit}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const productSlice = createSlice({
    name: 'review-slice',
    initialState,
    reducers: {
        
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getAllReviews.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.isLoading=false;
        })
        .addCase(getAllReviews.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(addReview.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews.push(action.payload);
        })
        .addCase(addReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getProductReviews.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getProductReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.reviews;
            state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
            state.currentPage = action.payload.page;
        })
        .addCase(getProductReviews.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const {} = productSlice.actions;
export {getAllReviews, addReview, getProductReviews};
export default productSlice.reducer;
