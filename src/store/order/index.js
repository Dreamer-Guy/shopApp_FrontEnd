import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    error: null,
    adminOrders:[],
    totalAdminOrders:0,
    currentEditingOrder:null,
};

const ADMIN_ORDER_BASE_URL=`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/orders`;


const getAllOrders=createAsyncThunk(
    `/orders/getAll`,
    async (query,{rejectWithValue}) => {
        try{
            const queryString=new URLSearchParams(query).toString();
            const response = await axios.get(`${ADMIN_ORDER_BASE_URL}/all?${queryString}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getOrderById=createAsyncThunk(
    `/orders/getById`,
    async (id,{rejectWithValue}) => {
        try{
            const queryString=new URLSearchParams(query).toString();
            const response = await axios.get(`${ADMIN_ORDER_BASE_URL}/${id}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const updateOrder=createAsyncThunk(
    `/orders/update`,
    async (data,{rejectWithValue,getState}) => {
        try{
            const state=getState();
            const  {currentEditingOrder}=state.order;
            const body={
                ...data
            };
            const response = await axios.put(`${ADMIN_ORDER_BASE_URL}/${currentEditingOrder._id}`,
                body,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const orderSlice = createSlice({
    name: 'order-slice',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getAllOrders.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.adminOrders = action.payload.orders;
            state.totalAdminOrders=action.payload.totalOrders;
            state.isLoading=false;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getOrderById.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getOrderById.fulfilled, (state, action) => {
            state.isLoading=false;
            state.currentEditingOrder=action.payload;
        })
        .addCase(getOrderById.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(updateOrder.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(updateOrder.fulfilled, (state, action) => {
            state.isLoading=false;
            state.currentEditingOrder=action.payload;
        })
        .addCase(updateOrder.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        ;
    },
});

export {getAllOrders,getOrderById,updateOrder}; 
export default orderSlice.reducer;
