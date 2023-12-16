import React from "react";
import ProductDetails from "../components/product/ProductItem";
import Breadcrumb from "../components/common/Breadcrumb";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const path = "Home > Product details";

  const { fileName } = useParams();
  return (
    <div className="mt-20">
      <Breadcrumb path={path} />
      {fileName}
      <ProductDetails />
    </div>
  );
};

export default ProductPage;
