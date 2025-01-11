import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    reviews: [],
    totalPages: 1,
    loading: false,
    error: null
}
const getUserReviews=createAsyncThunk('review/getUserReviews',
    async({userId,page,limit},{rejectWithValue})=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/reviews/user/${userId}?page=${page}&limit=${limit}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const userReviewSlice = createSlice({
    name: 'userReviewSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserReviews.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserReviews.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews;
            state.loading = false;
            state.totalPages = action.payload.totalPages;
        })
        .addCase(getUserReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default userReviewSlice.reducer;
export {getUserReviews};
