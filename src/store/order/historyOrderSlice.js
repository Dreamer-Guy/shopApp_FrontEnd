import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    orders: [],
    totalPages: 1,
    currentOrder: null,
    loading: false,
    error: null
}
const getUserOrders=createAsyncThunk('order/getUserOrders',
    async({userId,page,limit},{rejectWithValue})=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/orders/${userId}?page=${page}&limit=${limit}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const getOrderDetail=createAsyncThunk('order/getOrderDetail',
    async({orderId},{rejectWithValue})=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/orders/orderDetail/${orderId}`,{withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const historyOrderSlice = createSlice({
    name: 'historyOrderSlice',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload.orders;
            state.loading = false;
            state.totalPages = action.payload.totalPages;
        })
        .addCase(getUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getOrderDetail.pending, (state) => {
            state.loading = true;
        })
        .addCase(getOrderDetail.fulfilled, (state, action) => {
            state.currentOrder = action.payload;
            state.loading = false;
        })
        .addCase(getOrderDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export const {setCurrentPage} = historyOrderSlice.actions;
export default historyOrderSlice.reducer;
export {getUserOrders,getOrderDetail};
