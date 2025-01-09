import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const BASE_URL_REVENUE_API=`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/revenues`;

const DISPLAY_TO_QUERY_PARAMS_TYPEOFREVENUE={
    "Daily":"orders-day",
    "Monthly":"orders-month",
    "Yearly":"orders-year",
};

const DISPLAY_TO_QUERY_PARAMS_TYPEOFMETRICS={
    "Daily":"metrics-day",
    "Monthly":"metrics-month",
    "Yearly":"metrics-year",
};


const initialState = {
    isLoading: false,
    error: null,
    label:[],
    revenue:[
        {
            count:0,
            total:0,
        }
    ],
    totalOrders:0,
    totalRevenue:0,
    totalPurchasedProducts:0,
    totalCustomers:0,
};


const getRevenueByType=createAsyncThunk(
    `/admin/revenues`,
    async (data={type:"Daily",start:{year:new Date().getFullYear()}},{rejectWithValue}) => {
        try{
            const typeOfRevenue=DISPLAY_TO_QUERY_PARAMS_TYPEOFREVENUE[data.type];
            const queryParams=new URLSearchParams();
            queryParams.append("year",data.start.year);
            if(!isNaN(data.start.month)){
                queryParams.append("month",data.start.month);
            }
            if(!isNaN(data.start.day)){
                queryParams.append("day",data.start.day);
            }
            const response = await axios.get(`${BASE_URL_REVENUE_API}/${typeOfRevenue}/?${queryParams.toString()}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getMetrics=createAsyncThunk(
    `/admin/metrics`,
    async (data={type:"Daily",start:{year:new Date().getFullYear()}},{rejectWithValue}) => {
        try{
            const typeOfRevenue=DISPLAY_TO_QUERY_PARAMS_TYPEOFMETRICS[data.type];
            const queryParams=new URLSearchParams();
            queryParams.append("year",data.start.year);
            if(!isNaN(data.start.month)){
                queryParams.append("month",data.start.month);
            }
            if(!isNaN(data.start.day)){
                queryParams.append("day",data.start.day);
            }
            const response = await axios.get(`${BASE_URL_REVENUE_API}/${typeOfRevenue}/?${queryParams.toString()}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const revenueSlice = createSlice({
    name: 'revenue-slice',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getRevenueByType.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getRevenueByType.fulfilled, (state, action) => {
            state.label = action.payload.label;
            state.revenue = action.payload.revenue;
        })
        .addCase(getRevenueByType.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(getMetrics.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getMetrics.fulfilled, (state, action) => {
            state.totalOrders = action.payload.totalOrders;
            state.totalRevenue = action.payload.totalRevenue;
            state.totalPurchasedProducts = action.payload.totalPurchasedProducts;
            state.totalCustomers = action.payload.totalCustomers;
        })
        .addCase(getMetrics.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        ;
    },
});

export {getRevenueByType,getMetrics};
export default revenueSlice.reducer;
