// src/redux/slices/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  subCategory: [],
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
       state.category=action.payload
    },
    setSubCategory: (state, action) => {
      state.subCategory=action.payload
    },
    addCategory: (state, action) => {
      state.category=[...state.category,action.payload]
    },
  },
});

export const { setCategories ,setSubCategory,addCategory} = categorySlice.actions;

export default categorySlice.reducer;
