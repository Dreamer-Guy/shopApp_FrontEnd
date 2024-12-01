
// ...existing imports...
import productReducer from './product/productSlice';

export const store = configureStore({
  reducer: {
    // ...existing reducers...
    products: productReducer,
  },
});