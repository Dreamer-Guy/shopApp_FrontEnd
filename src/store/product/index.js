import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const BASE_ADMIN_PRODUCT_URL = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products`;


const initialState = {
    isLoading: false,
    error: null,
    products: [],
    totalProducts:0,
    currentProduct: {},
    currentProductDetails:[],
    softDeletedProducts:[],
    totalSoftDeletedProducts:0,
    totalSales:0,
    topSalesProducts:[],
};

const getAllProducts=createAsyncThunk(
    `/admin/products/all`,
    async (query,{rejectWithValue}) => {
        try{
            console.log(query);
            const sortKey=Object.keys(query.sort)[0];
            const sortValue=Object.values(query.sort)[0];
            let filter="";
            if(query.filter.category!=='all'){
                filter+=`&filter[category_id]=${query.filter.category}`;
            }
            if(query.filter.brand!=='all'){
                filter+=`&filter[brand_id]=${query.filter.brand}`;
            }
            let queryParams=`page=${query.page}&limit=${query.limit}&sort[${sortKey}]=${sortValue}`+filter;
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/all/?${queryParams}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getProductById=createAsyncThunk(
    `/admin/products/get`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/get/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);


const getProductDetailsById=createAsyncThunk(
    `/admin/product-details/get`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/product-details/get/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const addProduct=createAsyncThunk(
    `/admin/products/add`,
    async (data,{rejectWithValue,getState}) => {
        try{
            const state=getState();
            const currentCategoryTypicals=state.category.currentCategoryTypicals;
            const product={
                name:data.name,
                cost:data.cost,
                price:data.price,
                salePrice:data.salePrice,
                totalStock:data.totalStock,
                description:data.description,
                brand_id:data.brand,
                category_id:data.category,
            };
            const productDetails=Object.keys(data).reduce((acc,element)=>{
                if(currentCategoryTypicals.find((typical)=>typical.name===element)){
                    return [...acc,{
                        property_id:currentCategoryTypicals.find((typical)=>typical.name===element)._id,
                        name:element,
                        value:data[element]
                    }];
                }
                return acc;
            },[]);
            product.productDetails=productDetails;
            const formData=new FormData();
            formData.append('image',data.image);
            formData.append('product',JSON.stringify(product));
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/add/`,
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

const updateProduct=createAsyncThunk(
    `/admin/products/update`,
    async ({id,data},{rejectWithValue,getState}) => {
        try{
            const formData=new FormData();
            const product={
                name:data.name,
                cost:data.cost,
                price:data.price,
                salePrice:data.salePrice,
                totalStock:data.totalStock,
                description:data.description,
                brand_id:data.brand,
                category_id:data.category,
            };
            typeof data.image!=='string'?product.image=data.image:formData.image=data.image;
            const state=getState();
            product.productDetails=state.product.currentProductDetails;
            formData.append('product',JSON.stringify(product));
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/update/${id}`,
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

const softDeleteProduct=createAsyncThunk(
    `/admin/products/soft-delete`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.delete(`${BASE_ADMIN_PRODUCT_URL}/soft-delete/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const restoreSoftDeletedProduct=createAsyncThunk(
    `/admin/products/restore`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.post(`${BASE_ADMIN_PRODUCT_URL}/restore/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getSoftDeletedProducts=createAsyncThunk(
    `/admin/products/get/soft-deleted`,
    async ({page,limit},{rejectWithValue}) => {
        try{
            const response = await axios.get(`${BASE_ADMIN_PRODUCT_URL}/soft-deleted?page=${page}&limit=${limit}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const deleteProduct=createAsyncThunk(
    `/admin/products/delete`,
    async (id,{rejectWithValue}) => {
        try{
            console.log(id);
            const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/delete/${id}`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getTotalProducts=createAsyncThunk(
    `/admin/products/count-total`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getTotalSales=createAsyncThunk(
    `/admin/products/total-sales`,
    async (id,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/total-sales`,
                {withCredentials:true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response?.data?err.response.data.message:err.message);
        }
    },
);

const getTopSalesProducts=createAsyncThunk(
    `/admin/products/top-sales`,
    async (limit,{rejectWithValue}) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/products/top-sales?limit=${limit}`,
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
        setCurrentProductDetails:(state,action)=>{
            for(const key of Object.keys(action.payload)){
                if(state.currentProductDetails.find((element)=>element.name===key)){
                    const index=state.currentProductDetails.findIndex((element)=>element.name===key);
                    state.currentProductDetails[index].value=action.payload[key];
                }
            };
        },
        
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getAllProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.totalProducts = action.payload.totalProducts;
            state.isLoading=false;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(getProductById.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            state.currentProduct = action.payload;
            state.isLoading=false;
        })
        .addCase(getProductById.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(getProductDetailsById.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getProductDetailsById.fulfilled, (state, action) => {
            state.currentProductDetails = action.payload;
            state.isLoading=false;
        })
        .addCase(getProductDetailsById.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(addProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading=false;
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.isLoading=false;
        })
        .addCase(updateProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.currentProduct = action.payload.product;
            state.currentProductDetails = action.payload.productDetails;
            state.isLoading=false;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(deleteProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.softDeletedProducts = state.softDeletedProducts.filter((product)=>product._id!==action.payload._id);
            state.isLoading=false;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(softDeleteProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(softDeleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((product)=>product._id!==action.payload._id);
            state.isLoading=false;
        })
        .addCase(softDeleteProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(getSoftDeletedProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getSoftDeletedProducts.fulfilled, (state, action) => {
            state.softDeletedProducts = action.payload.products;
            state.totalSoftDeletedProducts = action.payload.total;
            state.isLoading=false;
        })
        .addCase(getSoftDeletedProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(restoreSoftDeletedProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(restoreSoftDeletedProduct.fulfilled, (state, action) => {
            state.softDeletedProducts = state.softDeletedProducts.filter((product)=>product._id!==action.payload._id);
            state.isLoading=false;
        })
        .addCase(restoreSoftDeletedProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(getTotalProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalProducts.fulfilled, (state, action) => {
            state.totalProducts = action.payload;
            state.isLoading=false;
        })
        .addCase(getTotalProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(getTotalSales.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTotalSales.fulfilled, (state, action) => {
            state.totalSales = action.payload;
            state.isLoading=false;
        })
        .addCase(getTotalSales.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        .addCase(getTopSalesProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getTopSalesProducts.fulfilled, (state, action) => {
            state.topSalesProducts = action.payload;
            state.isLoading=false;
        })
        .addCase(getTopSalesProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false;
        })
        ;
    },
});



export const {setCurrentProductDetails}=productSlice.actions;
export {getAllProducts,getProductById,getProductDetailsById,deleteProduct,addProduct,updateProduct,
    softDeleteProduct,restoreSoftDeletedProduct,getSoftDeletedProducts,getTotalProducts,getTotalSales,
    getTopSalesProducts
};
export default productSlice.reducer;
