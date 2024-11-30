import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    categories: null,
    error: null
};

const addCategory=createAsyncThunk(
    `/admin/categories/add`,
    async (data,{rejectWithValue}) => {
        try{
            const formData= new FormData();
            formData.append('image',data.image);
            formData.append('name',data.name);
            formData.append('description',data.description);
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categories/add`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const adminCategorySlice = createSlice({
    name: 'admin-category-slice',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=> {
        builder
        .addCase(addCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        })
        ;
    },
});

export {addCategory};
export default adminCategorySlice.reducer;
