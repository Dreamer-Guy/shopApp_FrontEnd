import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    error: null,
    reviews: [],
};

const getAllReviews=createAsyncThunk(
    `/reviews/all`,
    //add when needed
    async (id,{rejectWithValue}) => {
        try{

            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/reviews/${id}`       , //data when needed
                {withCredentials:true}); //send with cookie
            return response.data;
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
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/reviews/${reviewData.productId}`,
                reviewData,
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
        });
    },
});

export const {} = productSlice.actions;
export {getAllReviews, addReview};
export default productSlice.reducer;
