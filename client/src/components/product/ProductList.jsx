import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import OrangeButton from "../common/OrangeButton";

const ProductListPage = () => {
  const handleButtonClick = () => {
    // Handle button click logic here
  };

  const categories = [
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Laptops",
          products: [
            {
              id: 1,
              name: "Laptop 1",
              rating: 4.5,
              image:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS3o1zmQ3OAuzaHG2uhUy26NPjIieWJhKhj7UG2dgeaCmL2_XJxuoh0RMCDLAHY1VJFBDbJvqvA5fI2y2CrZ45NajV4FnCx533YWizesNGgNOJI0RENjeQNYg&usqp=CAc",
            },
            {
              id: 2,
              name: "Laptop 2",
              rating: 4.5,
              image:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS3o1zmQ3OAuzaHG2uhUy26NPjIieWJhKhj7UG2dgeaCmL2_XJxuoh0RMCDLAHY1VJFBDbJvqvA5fI2y2CrZ45NajV4FnCx533YWizesNGgNOJI0RENjeQNYg&usqp=CAc",
            },
          ],
        },
        {
          name: "Tablets",
          products: [
            { id: 3, name: "Tablet 1", rating: 4.0 },
            { id: 4, name: "Tablet 2", rating: 3.8 },
          ],
        },
        {
          name: "Headphones",
          products: [
            { id: 5, name: "Headphone 1", rating: 3.5 },
            { id: 6, name: "Headphone 2", rating: 4.1 },
          ],
        },
      ],
    },
    // Add more categories as needed
  ];

  const buttonNames = ["Add Category", "Add Sub Category", "Add Product"];

  return (
    <div className="flex">
      {/* Categories on the left */}
      <div className="w-1/4 px-2 text-left">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="mb-2">
              <strong>{category.name}</strong>
              <ul>
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>
                    <strong>{subcategory.name}</strong>
                    <ul>
                      {subcategory.products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Product cards on the right */}
      <div className="w-3/4 relative">
        <div className="absolute right-0 top-0 ">
          {buttonNames.map((name) => (
            <OrangeButton key={name} onClick={handleButtonClick}>
              {name}
            </OrangeButton>
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-5">Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories
            .flatMap((category) =>
              category.subcategories.flatMap(
                (subcategory) => subcategory.products
              )
            )
            .map((product) => (
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
