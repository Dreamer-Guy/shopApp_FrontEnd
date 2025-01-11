import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



const initialState = {
    isLoading: false,
    error: null,
    totalNewCustomers:0,
    totalReturningCustomers:0,
    totalOrders:0,
    totalStaffSalary:0,
    totalRevenue:0,
    profit:0,
    totalPurchasedItems:0,
};

const ADMIN_METRICS_BASE_URL=`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/metrics`;


const getTotalNewCustomers=createAsyncThunk(
    `/new-customers/count-total`,
    async (query,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_METRICS_BASE_URL}/total-new-customers`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getTotalReturningCustomers=createAsyncThunk(
    `/returning-customers/count-total`,
    async (query,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_METRICS_BASE_URL}/total-returning-customers`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getTotalOrders=createAsyncThunk(
    `/total/count-total`,
    async (query,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_METRICS_BASE_URL}/total-orders`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);


const getTotalStaffSalary=createAsyncThunk(
    `/staff-salary/total`,
    async (query,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_METRICS_BASE_URL}/total-staff-salary`,
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
    `/revenue/total`,
    async (query,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_METRICS_BASE_URL}/total-revenue`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getProfit=createAsyncThunk(
    `/profit`,
    async (query,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_METRICS_BASE_URL}/profit`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getTotalPurchasedItems=createAsyncThunk(
    `/purchased-items/count-total`,
    async (query,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_METRICS_BASE_URL}/total-purchased-items`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const metricsSlide = createSlice({
    name: 'metrics-slice',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getTotalNewCustomers.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalNewCustomers.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalNewCustomers = action.payload;
        })
        .addCase(getTotalNewCustomers.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getTotalReturningCustomers.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalReturningCustomers.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalReturningCustomers = action.payload;
        })
        .addCase(getTotalReturningCustomers.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getTotalOrders.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalOrders.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalOrders = action.payload;
        })
        .addCase(getTotalOrders.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getTotalStaffSalary.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalStaffSalary.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalStaffSalary = action.payload;
        })
        .addCase(getTotalStaffSalary.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getProfit.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getProfit.fulfilled, (state, action) => {
            state.isLoading=false;
            state.profit = action.payload;
        })
        .addCase(getProfit.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getTotalRevenue.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalRevenue.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalRevenue = action.payload;
        })
        .addCase(getTotalRevenue.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getTotalPurchasedItems.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalPurchasedItems.fulfilled, (state, action) => {
            state.isLoading=false;
            state.totalPurchasedItems= action.payload;
        })
        .addCase(getTotalPurchasedItems.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        ;
    },
});

export {getTotalNewCustomers,getTotalReturningCustomers,getTotalOrders,
    getTotalStaffSalary,getTotalRevenue,getProfit,getTotalPurchasedItems};
export default metricsSlide.reducer;
