import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import OrangeButton from "../common/OrangeButton";
import { buttonNames } from "../../constants";
import { setProducts } from "../../redux/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import AddCategoryModal from "../modal/AddCategory";
import AddProductModal from "../modal/AddProduct";
import AddSubcategoryModal from "../modal/AddSubCategory";
import productApi from "../../api/productApi";

const ProductList = ({ categories }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [modalType, setModalType] = useState(null);
  const [page, setPage] = useState(1); // State for tracking the current page

  console.log(products);

  const closeModal = () => {
    setModalType(null);
  };

  const renderModal = () => {
    switch (modalType) {
      case "add-category":
        return <AddCategoryModal onClose={closeModal} />;
      case "add-sub category":
        return (
          <AddSubcategoryModal onClose={closeModal} categories={categories} />
        );
      case "add-product":
        return <AddProductModal onClose={closeModal} />;
      default:
        return null;
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productApi.getProducts(page);
      dispatch(setProducts(response?.paginatedProducts));
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error if needed
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]); // Fetch products when the page changes

  useEffect(() => {
    // Add a scroll event listener
    const handleScroll = () => {
      // Check if the user has reached the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1); // Increase the page number
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Remove the event listener on component unmount
    };
  }, []);

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2 f">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded w-52 flex flex-col  "
          >
            <div className=" flex justify-end px-2 py-2">
              <HeartIcon className="h-6 w-6  bg-blue-300 rounded-full  px-1" />
            </div>

            <img
              className="w-28 items-center object-cover"
              src={product?.images[0]}
              alt="image"
            />
            <h3 className="text-lg font-sm">{product?.title}</h3>
            <div className="flex items-center ">
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
        ))}
      </div>
    </div>
  );
};

export default ProductList;
