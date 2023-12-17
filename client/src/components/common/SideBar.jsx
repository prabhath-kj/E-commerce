import React, { useState } from "react";

import productApi from "../../api/productApi";

const Sidebar = ({ categories, handleFilter }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await productApi.fetchSubCategories(categoryId);
      setSubcategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    handleFilter("");
    setSelectedSubcategory(null)
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setSubcategories([]);
    } else {
      setExpandedCategory(categoryId);
      await fetchSubcategories(categoryId);
    }
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    handleFilter(subcategory);
  };

  return (
    <div className="w-1/4 px-2 text-left">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul>
        {categories.map(({ categoryName, _id }) => (
          <li key={_id} className="mb-2 cursor-pointer">
            <strong onClick={() => handleCategoryClick(_id)}>
              {categoryName + " >"}
            </strong>
            {expandedCategory === _id && (
              <ul>
                {subcategories.map(({ subcategoryName, _id }) => (
                  <li key={_id}>
                    <label className="flex uppercase">
                      <input
                        type="checkbox"
                        style={{
                          background: "black",
                          width: "20px", // Set the desired width
                          height: "20px", // Set the desired height
                        }}
                        className="mr-2"
                        checked={selectedSubcategory === _id}
                        onChange={() => handleSubcategorySelect(_id)}
                      />
                      {subcategoryName}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
