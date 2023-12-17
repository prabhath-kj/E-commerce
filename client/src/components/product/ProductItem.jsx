import React, { useEffect, useState } from "react";
import { DUMMY_IMAGE } from "../../constants/index";
import OrangeButton from "../common/OrangeButton";
import productApi from "../../api/productApi";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getSingleProduct(productId);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    // Loading state, you can customize this
    return (
      <div className="flex h-screen justify-center items-center font-medium text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto  flex">
      {/* Left Side: Product Images */}
      <div className="w-1/2  px-5 py-5 ">
        {/* Main Product Image */}
        <img
          src={product?.images[0] ?? DUMMY_IMAGE}
          alt="Main Product"
          className="w-full h-64 object-contain border border-gray-500 rounded shadow mb-4"
        />

        {/* Small Product Images */}
        <div className="flex ">
          <img
            src={product?.images[1] ?? DUMMY_IMAGE}
            alt="Small Product 1"
            className="w-1/2 h-28 object-contain mr-2 border  border-gray-500 rounded shadow"
          />
          <img
            src={product?.images[2] ?? DUMMY_IMAGE}
            alt="Small Product 2"
            className="w-1/2 h-28 object-contain ml-2 border  border-gray-500 rounded shadow"
          />
        </div>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-1/2 px-8 py-5">
        <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
        <p className="text-gray-600 mb-4">{product?.description}</p>
        <div className="pt-4">
          <p className="text-gray-700">
            <span className="font-bold">Price:</span> ${product?.price}
          </p>
          <p className="text-gray-700 font-bold">
            <span>Hurry up only !</span> {product?.quantity} product left in
            Stock .
          </p>
          {/* Add more details as needed */}
        </div>
        <div className="w-1/2 border-t  mb-4 ">
          {/* Edit Button */}
          <div className="flex justify-between ">
            <OrangeButton setModalType={false}> Edit Product</OrangeButton>
            <OrangeButton setModalType={false}> Buy It Now</OrangeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
