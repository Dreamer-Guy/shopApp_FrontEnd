import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    categories: null,
    error: null,
    currentCategory:{},
    currentCategoryTypicals:[],
};

const addCategoryTypical=createAsyncThunk(
    `/admin/categoryTypicals/add`,
    async (data,{rejectWithValue}) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categoryTypicals/add`,
                data,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);
const getCategoryTypicalDetails=createAsyncThunk(
    `/admin/categoryTypicals/all`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categoryTypicals/all/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const deleteCategoryTypical=createAsyncThunk(
    `/admin/categoryTypicals/delete`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categoryTypicals/delete/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getAllCategories=createAsyncThunk(
    `/admin/categories/all`,
    async (_,{rejectWithValue}) => {
        try{

            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categories/all/`,
                _,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getCategoryById=createAsyncThunk(
    `/admin/categories/get`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categories/get/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

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

const deleteCategory=createAsyncThunk(
    `/admin/categories/delete`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categories/delete/${id}`,
                _,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const updateCategory=createAsyncThunk(
    `/admin/categories/update`,
    async ({id,data},{rejectWithValue}) => {
        const formData= new FormData();
        if(typeof data.image!=='string'){
            formData.append('image',data.image);
        }
        formData.append('name',data.name);
        formData.append('description',data.description);
        try{
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categories/update/${id}`,
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
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getAllCategories.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;  
        })
        .addCase(getAllCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getCategoryById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCategoryById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentCategory = action.payload;
        })
        .addCase(getCategoryById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getCategoryTypicalDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCategoryTypicalDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentCategoryTypicals = action.payload;
        })
        .addCase(getCategoryTypicalDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(updateCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentCategory = action.payload;
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(deleteCategoryTypical.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCategoryTypical.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentCategoryTypicals = state.currentCategoryTypicals.filter((categoryTypical)=>categoryTypical._id!==action.payload._id);
        })
        .addCase(deleteCategoryTypical.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(addCategoryTypical.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addCategoryTypical.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentCategoryTypicals.push(action.payload.typicalDetail);
        })
        .addCase(addCategoryTypical.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        ;
    },
});

export {addCategory,deleteCategory,getAllCategories,
updateCategory,getCategoryById,getCategoryTypicalDetails,deleteCategoryTypical,addCategoryTypical};
export default adminCategorySlice.reducer;
