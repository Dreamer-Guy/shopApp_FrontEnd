import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    brands: [],
    error: null
};

const ADMIN_BRANDS_BASE_URL=`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/brands`;

const getAllBrands=createAsyncThunk(
    `/admin/brands/all`,
    async (_,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${ADMIN_BRANDS_BASE_URL}/all`,
                _,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const addBrand=createAsyncThunk(
    `/admin/brands/add`,
    async (data,{rejectWithValue}) => {
        try{
            const formData=new FormData();
            formData.append('image',data.image);
            formData.append('name',data.name);
            formData.append('description',data.description);
            const response = await axios.post(`${ADMIN_BRANDS_BASE_URL}/add`,
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

const deleteBrand=createAsyncThunk(
    `/admin/brands/delete`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.delete(`${ADMIN_BRANDS_BASE_URL}/${id}`,   
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const adminBrandSlice = createSlice({
    name: 'admin-brand-slice',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload.user;
        },
    },
    extraReducers:(builder)=> {
        builder
        .addCase(addBrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("full",action.payload);
        })
        .addCase(addBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.error=action.payload;
        })
        .addCase(getAllBrands.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brands=action.payload;
        })
        .addCase(getAllBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.error=action.payload;
        })
        .addCase(deleteBrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brands=state.brands.filter((brand)=>brand._id!==action.payload);
        })
        .addCase(deleteBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.error=action.payload;
        })
        ;
    },
});

export {addBrand,getAllBrands,deleteBrand};
export default adminBrandSlice.reducer;
