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

const forgotPassword = createAsyncThunk(
    'users/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/forgot-password`,
                { email },
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const verifyResetToken = createAsyncThunk(
    'users/verifyToken',
    async ({ email, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/verify-token`,
                { email, token },
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const resetPassword = createAsyncThunk(
    'users/resetPassword',
    async ({email, token, newPassword}, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/users/reset-password`,
                { email, token, newPassword },
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const userSlice = createSlice({
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
            saveUserToLocalStorage(action.payload.user)
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
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(verifyResetToken.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(verifyResetToken.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(verifyResetToken.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(resetPassword.rejected, (state, action) => {
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
        });
    },
});

export const { setProfile } = userSlice.actions;
export {loginUser,logoutUser,registerUser,getStatus,updateProfile,getUserAddress,updateUserAddress,updateUserPassword,forgotPassword,verifyResetToken,resetPassword};
export default userSlice.reducer;
