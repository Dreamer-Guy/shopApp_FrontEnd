
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import shopProductSlice from './shop/productSlice/index.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    
    shopProducts : shopProductSlice, 
  },
});

export default store;
