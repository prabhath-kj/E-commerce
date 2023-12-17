import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products:productReducer,
    auth:authReducer,
    // Add other reducers here if needed
  },
});

export default store;
