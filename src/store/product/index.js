import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isLoading: false,
    error: null,
    products: [],
};

const getAllProducts=createAsyncThunk(
    `/admin/products/all`,
    async (_,{rejectWithValue}) => {
        try{

            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/all/`,
                _,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);


const productSlice = createSlice({
    name: 'product-slice',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload.user;
        },
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getAllProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.error = action.payload;
        })
        ;
    },
});

export {getAllProducts};
export default productSlice.reducer;
