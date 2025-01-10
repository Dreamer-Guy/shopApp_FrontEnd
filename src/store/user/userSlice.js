import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { saveUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage';


const initialState = {
    isLoading: false,
    isAuthenticated: !!getUserFromLocalStorage(),
    user: getUserFromLocalStorage(),
    address:null,
    error: null
};

const loginUser=createAsyncThunk(
    `users/login`,
    async (data,{rejectWithValue}) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/login`,
                data,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);
const logoutUser=createAsyncThunk(
    `users/logout`,
    async (_,{rejectWithValue}) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/logout`,
                {}, 
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);



const registerUser=createAsyncThunk(
    `users/register`,
    async (data,{rejectWithValue}) => {
        try{
            console.log(data);
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/register`,data);
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);
const updateProfile=createAsyncThunk(
    `users/updateProfile`,
    async(formData,{rejectWithValue})=>{
        try{
            console.log(formData.get("fullName"));
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/updateProfile`,
                formData,
                {withCredentials:true});
                return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const getUserAddress=createAsyncThunk(
    `users/getUserAddress`,
    async(userId,{rejectWithValue})=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/address/${userId}`,{withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const updateUserAddress=createAsyncThunk(
    `users/updateUserAddress`,
    async(data,{rejectWithValue})=>{
        try{
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/updateAddress`,
                data,{withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    }
)
const getStatus = createAsyncThunk(
    `users/status`,
    async (_,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/status`,{withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
)

const counterSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload.user;
        },
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getStatus.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(getStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            saveUserToLocalStorage(action.payload.user);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
        })           
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            removeUserFromLocalStorage();
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
        })
        .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            saveUserToLocalStorage(action.payload.user);
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getUserAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.address = action.payload.address;
        })
        .addCase(getUserAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.address = null;
        })
        .addCase(updateUserAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.address = action.payload.address;
        })
        .addCase(updateUserAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        ;
    },
});

export const { setProfile } = counterSlice.actions;
export {loginUser,logoutUser,registerUser,getStatus,updateProfile,getUserAddress,updateUserAddress};
export default counterSlice.reducer;