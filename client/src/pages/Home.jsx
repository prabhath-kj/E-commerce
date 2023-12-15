import React from "react";
import ProductListPage from "../components/product/ProductList";
import Breadcrumb from "../components/common/Breadcrumb";

const Home = () => {
  const path = "Home >";

  return (
    <div className="mt-20">
      <Breadcrumb path={path} />
      <ProductListPage />
    </div>
  );
};

export default Home;
