import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/productSlice';
import orderReducer from './order/orderSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    order: orderReducer,
  },
});