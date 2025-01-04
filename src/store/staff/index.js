import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    error: null,
    staffs:[],
    totalStaffs:0,
    currentEdittingStaffId:null,
    currentEdittingStaffProperties:{},
};

const STAFF_BASE_URL=`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/staffs`;

const getAllStaffs=createAsyncThunk(
    `/staffs/all`,
    async (filter,{rejectWithValue}) => {
        try{
            const page=filter.page||1;
            const limit=filter.limit||8;
            const sortKey=Object.keys(filter.sort)[0];
            const sortOrder=filter.sort[sortKey];
            console.log(`${STAFF_BASE_URL}/all?page=${page}&limit=${limit}&sort[${sortKey}]=${sortOrder}`);
            const response = await axios.get(`${STAFF_BASE_URL}/all?page=${page}&limit=${limit}&sort[${sortKey}]=${sortOrder}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const deleteStaff=createAsyncThunk(
    `/staffs/delete`,
    async (customerId,{rejectWithValue}) => {
        try{
            const response = await axios.delete(`${STAFF_BASE_URL}/delete/${customerId}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const getStaffProperties=createAsyncThunk(
    `/staffs/properties`,
    async (staffId,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${STAFF_BASE_URL}/staff-properties/${staffId}`,
                {},
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);

const addStaff=createAsyncThunk(
    `/staffs/add`,
    async (staff,{rejectWithValue}) => {
        try{
            const body={
                fullName:staff.fullName,
                userName:staff.userName,
                email:staff.email,
                staffProperties:{
                    salary:staff.salary,
                    phone:staff.phone,
                    address:staff.address,
                }
            }
            const response = await axios.post(`${STAFF_BASE_URL}/create`,
                body,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err?.response?.data?.message:err.message);
        }
    },
);


const staffSlice = createSlice({
    name: 'staff-slice',
    initialState,
    reducers: {
        setCurrentEdittingStaffId(state,action){
            state.currentEdittingStaffId=action.payload;
        },
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getAllStaffs.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllStaffs.fulfilled, (state, action) => {
            state.staffs = action.payload.staffs;
            state.totalStaffs=action.payload.totalStaffs;
            state.isLoading=false;
        })
        .addCase(getAllStaffs.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(deleteStaff.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteStaff.fulfilled, (state, action) => {
            state.isLoading=false;
            state.staffs=state.staffs.filter(staff=>staff._id!==action.payload._id);
        })
        .addCase(deleteStaff.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(getStaffProperties.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getStaffProperties.fulfilled, (state, action) => {
            state.isLoading=false;
            state.currentEdittingStaffProperties = action.payload;
        })
        .addCase(getStaffProperties.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        .addCase(addStaff.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(addStaff.fulfilled, (state, action) => {
            state.isLoading=false;
        })
        .addCase(addStaff.rejected, (state, action) => {
            state.isLoading=false;
            state.error = action.payload;
        })
        ;
    },
});

export const {setCurrentEdittingStaffId} = staffSlice.actions;
export {getAllStaffs,deleteStaff,getStaffProperties,addStaff};
export default staffSlice.reducer;
