import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { saveUserToLocalStorage, getUserFromLocalStorage} from '../utils/localStorage';


const initialState = {
    isLoading: false,
    isAuthenticated: !!getUserFromLocalStorage(),
    user: getUserFromLocalStorage(),
    staffProperties:null,
    address:null,
    error: null
};
const getStaffProperties=createAsyncThunk(
    `staff/getStaff`,
    async(_,{rejectWithValue})=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/staff/getStaffProperties`,{withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const updateProfile=createAsyncThunk(
    `users/updateProfile`,
    async(formData,{rejectWithValue})=>{
        try{
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/staff/updateProfile`,
                formData,
                {withCredentials:true});
                return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const updateUserPassword= createAsyncThunk(
    `users/updatePassword`,
    async(data,{rejectWithValue})=>{
        try{
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/changePassword`,
                data,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const staffSlice = createSlice({
    name: 'staff-slice',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload.user;
        },
    },
    extraReducers:(builder)=> {
        builder
        .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.staffProperties = action.payload.staffProperties;
            saveUserToLocalStorage(action.payload.user);
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(updateUserPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.message;
            saveUserToLocalStorage(action.payload.message);
        })
        .addCase(updateUserPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.response?.data?.message||"Error updating password";
        })
        .addCase(getStaffProperties.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getStaffProperties.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffProperties = action.payload.staffProperties;
        })
        .addCase(getStaffProperties.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.response?.data?.message||"Error getting staff properties";
        })
    },
});

export const { setProfile } = staffSlice.actions;
export {updateProfile,updateUserPassword,getStaffProperties};
export default staffSlice.reducer;
