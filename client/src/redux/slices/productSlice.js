import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      const newProducts = state.products.map((product) => {
        if (product._id == action.payload._id) {
          return action.payload;
        }
        return product;
      });

      state.products = newProducts;
    },
  },
});

export const { setProducts, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
