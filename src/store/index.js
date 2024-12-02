
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import shopProductSlice from './shop/productSlice/index.js';
import adminBrandReducer from "./admin/brandSlice.js";
import adminCategoryReducer from "./admin/categorySlice.js";
import productReducer from "./product/index.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        brand: adminBrandReducer,
        category: adminCategoryReducer,
        shopProducts: shopProductSlice, 
        product: productReducer,
    },
});

export default store;
