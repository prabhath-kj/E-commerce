import React, { useState, useEffect } from "react";
import Sidebar from "../common/SideBar";
import ProductList from "./ProductList";
import productApi from "../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/slices/categorySlice";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.category);
  // const products = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await productApi.fetchCategories();
        dispatch(setCategories(response));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    

    fetchCategories();
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar categories={categories} />
      <ProductList categories={categories}/>
    </div>
  );
};

export default ProductListPage;
