
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import shopProductSlice from './shop/product/index.js';
import adminBrandReducer from "./admin/brandSlice.js";
import adminCategoryReducer from "./admin/categorySlice.js";
import productReducer from "./product/index.js";

import reviewReducer from "./review/review-slice.js";
import cartReducer from "./cart/index.js";
import customerReducer from "./customer/index.js";
import revenueReducer from "./revenue/index.js";
import filterOptionsSlice from './shop/product/filterOptionsSlice.js';
import staffReducer from './staff/index.js';
import orderReducer from './order/index.js';

import historyOrderReducer from './order/historyOrderSlice.js';
import userReviewReducer from './review/userReview.js';

import metricsReducer from "./metrics/index.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        brand: adminBrandReducer,
        category: adminCategoryReducer,
        shopProducts: shopProductSlice, 
        product: productReducer,
        review: reviewReducer,
        filterOptions: filterOptionsSlice,
        cart:cartReducer,
        customer:customerReducer,
        revenue:revenueReducer,
        staff:staffReducer,
        order:orderReducer,
        ordersHistory:historyOrderReducer,
        userReview:userReviewReducer,
        metrics:metricsReducer,
    },
});

export default store;
