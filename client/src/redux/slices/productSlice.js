import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const uniqueProducts = action.payload.filter(
        (newProduct) =>
          !state.products.some(
            (existingProduct) => existingProduct._id === newProduct._id
          )
      );
      state.products = [...state.products, ...uniqueProducts];
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
