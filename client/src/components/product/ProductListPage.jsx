import React, { useState } from "react";
import Sidebar from "../common/SideBar";
import ProductList from "./ProductList";

const ProductListPage = () => {
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

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (categoryIndex) => {
    setSelectedCategory(categoryIndex);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategoryIndex) => {
    setSelectedSubcategory(subcategoryIndex);
  };

  // ... (rest of your existing code)

  return (
    <div className="flex">
      <Sidebar
        categories={categories}
        onCategoryClick={handleCategoryClick}
        onSubcategoryClick={handleSubcategoryClick}
      />
      <ProductList
        products={categories
          .filter(
            (category, index) =>
              selectedCategory === null || selectedCategory === index
          )
          .flatMap((category) =>
            category.subcategories.flatMap((subcategory, subIndex) =>
              selectedSubcategory === null || selectedSubcategory === subIndex
                ? subcategory.products
                : []
            )
          )}
      />
    </div>
  );
};

export default ProductListPage;
