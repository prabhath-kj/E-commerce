import React, { useState, useEffect, useRef, useCallback } from "react";
import WishlistHeartIcon from "../common/WishListHeartIcon";
import OrangeButton from "../common/OrangeButton";
import { buttonNames } from "../../constants";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../modal/AddCategory";
import AddProductModal from "../modal/AddProduct";
import AddSubcategoryModal from "../modal/AddSubCategory";
import productApi from "../../api/productApi";

const ProductList = ({ categories, filter }) => {
  const router = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [modalType, setModalType] = useState(null);
  const [page, setPage] = useState(1);
  const reference = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const closeModal = () => {
    setModalType(null);
  };

  const renderModal = () => {
    switch (modalType) {
      case "add-category":
        return <AddCategoryModal onClose={closeModal} />;
      case "add-subcategory":
        return (
          <AddSubcategoryModal onClose={closeModal} categories={categories} />
        );
      case "add-product":
        return <AddProductModal onClose={closeModal} />;
      default:
        return null;
    }
  };

  const onIntersection = useCallback(
    async (entries) => {
      const firstItem = entries[0];
      if (firstItem.isIntersecting && hasMore) {
        await fetchProducts();
      }
    },
    [products, hasMore]
  );

  const fetchProducts = async () => {
    try {
      const { paginatedProducts: newProducts, totalPages } =
        await productApi.getProducts(page);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        // dispatch(setProducts(newProducts));
        setTotalPages(totalPages);
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error if needed
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && reference.current) {
      observer.observe(reference.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [products, onIntersection]);

  const filteredProducts =
    filter === ""
      ? products
      : products.filter((product) => product.subcategoryId === filter);

  const handleClick = (id) => {
    console.log(id);
    id ? router(`/product-details/${id}`) : null;
    return;
  };

  return (
    <>
      <div className="w-3/4 relative">
        {renderModal()}
        <div className="absolute top-0 right-0">
          {buttonNames.map((name, index) => (
            <OrangeButton key={index} setModalType={setModalType}>
              {name}
            </OrangeButton>
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-5">
          {filter ? "Products" : `Total Pages ${totalPages}`}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2 pr-2">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border rounded overflow-hidden">
              <div className="relative">
                <img
                  className="w-full h-48 object-contain cursor-pointer"
                  onClick={() => handleClick(product?._id)}
                  src={product?.images[0]}
                  alt="product"
                />
                <div className="absolute top-2 right-2">
                  {/* <HeartIcon className="h-6 w-6 bg-blue-300 rounded-full px-1" /> */}
                  <WishlistHeartIcon id={product?._id} />
                </div>
              </div>
              <div className="p-4">
                <h3
                  className="text-lg font-semibold mb-2 cursor-pointer"
                  onClick={() => handleClick(product?._id)}
                >
                  {product?.title}
                </h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">{product.rating}</span>
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 fill-current ${
                        star <= product.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 1l1.9 6.1H18l-5 3.9 1.9 6.1L10 13l-6.9 4.1 1.9-6.1-5-3.9h6.1L10 1z" />
                    </svg>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">${product.price}</span>
                  <OrangeButton setModalType={false}> Add to Cart</OrangeButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div
            ref={reference}
            className="font-extrabold text-lg flex justify-center items-center"
          >
            <div className="text-lg text-blue-600">Loading...</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
