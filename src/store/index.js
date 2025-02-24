 
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import shopProductSlice from './shop/product/index.js';
import adminBrandReducer from "./brand/index.js";
import adminCategoryReducer from "./category/index.js";
import productReducer from "./product/index.js";

import reviewReducer from "./review/review-slice.js";
import cartReducer from "./cart/index.js";
import customerReducer from "./customer/index.js";
import revenueReducer from "./revenue/index.js";
import filterOptionsSlice from './shop/product/filterOptionsSlice.js';
import adminStaffReducer from './staff/adminStaffSlice.js';
import orderReducer from './order/adminOrder.js';
import shopOrderReducer from './order/shopOrder.js';

import historyOrderReducer from './order/historyOrderSlice.js';
import userReviewReducer from './review/userReview.js';

import metricsReducer from "./metrics/index.js";
import staffSliceReducer from './staff/staffSlice.js';
import adminReviewSlice from "./admin/reviewSlice.js";

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
        adminStaff:adminStaffReducer,
        order:orderReducer,
        shopOrder:shopOrderReducer,
        ordersHistory:historyOrderReducer,
        userReview:userReviewReducer,
        metrics:metricsReducer,
        adminReview:adminReviewSlice,
        staffSlice:staffSliceReducer,
    },
});

export default store;
