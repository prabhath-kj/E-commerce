import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import OrangeButton from "../common/OrangeButton";
import { buttonNames } from "../../constants";
import AddCategoryModal from "../modal/AddCategory";
import AddProductModal from "../modal/AddProduct";
import AddSubcategoryModal from "../modal/AddSubCategory";

const ProductList = ({categories}) => {
  const [modalType, setModalType] = useState(null);


  const closeModal = () => {
    setModalType(null);
  };

  const renderModal = () => {
    switch (modalType) {
      case "add-category":
        return <AddCategoryModal onClose={closeModal} />;
      case "add-sub category":
        return <AddSubcategoryModal onClose={closeModal} categories={categories} />;
      case "add-product":
        return <AddProductModal onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-3/4 relative">
      {renderModal()}

      {/* Product cards on the right */}
      <div className="absolute top-0 right-0">
        {buttonNames.map((name, index) => (
          <OrangeButton key={index} setModalType={setModalType}>
            {name}
          </OrangeButton>
        ))}
      </div>
      <h2 className="text-lg font-semibold mb-5">Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* {products.map((product) => (
          <div key={product.id} className="border">
            <div className="flex justify-end">
              <HeartIcon className="h-6 w-6" />
            </div>
            <img
              className="text-center object-contain"
              src={product?.image}
              alt="Product"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 mr-1">{product.rating}</span>
              {[1, 2, 3, 4, 5].map((star, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 fill-current ${
                    star <= product.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 1l1.9 6.1H18l-5 3.9 1.9 6.1L10 13l-6.9 4.1 1.9-6.1-5-3.9h6.1L10 1z" />
                </svg>
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ProductList;
