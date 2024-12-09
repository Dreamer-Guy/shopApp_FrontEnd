import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    error: null,
    customers:[],
    totalCustomer:0,
};

const CUSTOMER_BASE_URL='customers';

const getAllCustomers=createAsyncThunk(
    `/customers/all`,
    async (filter,{rejectWithValue}) => {
        try{
            const page=filter.page||1;
            const limit=filter.limit||8;
            const sortKey=Object.keys(filter.sort)[0];
            const sortOrder=filter.sort[sortKey];
            console.log(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/${CUSTOMER_BASE_URL}/all?page=${page}&limit=${limit}&sort[${sortKey}]=${sortOrder}`);
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/${CUSTOMER_BASE_URL}/all?page=${page}&limit=${limit}&sort[${sortKey}]=${sortOrder}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const banCustomer=createAsyncThunk(
    `/customers/ban`,
    async (customerId,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/${CUSTOMER_BASE_URL}/ban/${customerId}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const unbanCustomer=createAsyncThunk(
    `/customers/unban`,
    async (customerId,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/${CUSTOMER_BASE_URL}/unban/${customerId}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);



const customerSlice = createSlice({
    name: 'cart-slice',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getAllCustomers.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllCustomers.fulfilled, (state, action) => {
            state.customers = action.payload;
            state.isLoading=false;
        })
        .addCase(getAllCustomers.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(banCustomer.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(banCustomer.fulfilled, (state, action) => {
            state.isLoading=false;
            state.customers.map((customer)=>{
                if(customer._id.toString()===action.payload){
                    customer.status="ban";
                }
            });
        })
        .addCase(banCustomer.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(unbanCustomer.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(unbanCustomer.fulfilled, (state, action) => {
            state.isLoading=false;
            state.customers.map((customer)=>{
                if(customer._id.toString()===action.payload){
                    customer.status="active";
                }
            });
        })
        .addCase(unbanCustomer.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        ;
    },
});

export {getAllCustomers,banCustomer,unbanCustomer};
export default customerSlice.reducer;
