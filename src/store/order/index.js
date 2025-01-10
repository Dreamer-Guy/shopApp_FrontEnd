import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



const initialState = {
    isLoading: false,
    error: null,
    adminOrders:[],
    totalAdminOrders:0,
    currentEditingOrder:{
        _id: "64a8cce5f2b41e7a01234567",
        status:'processing',
        paymentStatus:true,
    },
    totalRevenue:0,
    recentOrders:[],
};

const ADMIN_ORDER_BASE_URL=`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/orders`;


const getAllOrders=createAsyncThunk(
    `/orders/getAll`,
    async (query,{rejectWithValue}) => {
        try{
            const sortKey=Object.keys(query.sort)[0];
            const sortOrder=query.sort[sortKey];
            const queryString=`page=${query.page}&limit=${query.limit}&sort[${sortKey}]=${sortOrder}`+(query.status?`&status=${query.status}`:'');
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

const getTotalOrders=createAsyncThunk(
    `/orders/count-total`,
    async (_,{rejectWithValue,getState}) => {
        try{
            const response = await axios.get(`${ADMIN_ORDER_BASE_URL}/count-total`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getTotalRevenue=createAsyncThunk(
    `/orders/revenue-total`,
    async (_,{rejectWithValue,getState}) => {
        try{
            const response = await axios.get(`${ADMIN_ORDER_BASE_URL}/revenue-total`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getRecentOrders=createAsyncThunk(
    `/orders/recent`,
    async (limit,{rejectWithValue,getState}) => {
        try{
            const response = await axios.get(`${ADMIN_ORDER_BASE_URL}/recent?limit=${limit}`,
                {},
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
        .addCase(getTotalOrders.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalOrders.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalAdminOrders=action.payload;
        })
        .addCase(getTotalOrders.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getTotalRevenue.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalRevenue.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalRevenue=action.payload;
        })
        .addCase(getTotalRevenue.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getRecentOrders.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getRecentOrders.fulfilled, (state, action) => {
            state.isLoading=false;
            state.recentOrders=action.payload;
        })
        .addCase(getRecentOrders.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        ;
    },
});

export {getAllOrders,getOrderById,updateOrder,getTotalOrders,getTotalRevenue,
    getRecentOrders
}; 
export default orderSlice.reducer;
