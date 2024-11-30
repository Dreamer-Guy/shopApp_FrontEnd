import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import adminBrandReducer from "./admin/brandSlice.js";
import adminCategoryReducer from "./admin/categorySlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        adminBrand: adminBrandReducer,
        adminCategory: adminCategoryReducer,
    },
});

export default store;
