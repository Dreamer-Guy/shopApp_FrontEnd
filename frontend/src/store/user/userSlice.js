import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const initialState = {
  isLoading: false,
  user: null,
};

const loginUser=createAsyncThunk(
    `users/login`,
    async ({data},{rejectWithValue}) => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`,data);
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);


const logoutUser=createAsyncThunk(
    `users/logout`,
    async ({},{rejectWithValue}) => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/logout`);
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);



const registerUser=createAsyncThunk(
    `users/register`,
    async ({data},{rejectWithValue}) => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`,data);
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);


const getStatus = createAsyncThunk(
    `users/status`,
    async ({},{rejectWithValue}) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/status`);
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
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getStatus.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        })
        .addCase(getStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
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
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
        });
    },
});

export {loginUser,logoutUser,registerUser,getStatus};
export default counterSlice.reducer;
