import React, { useState } from "react";

const Sidebar = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  const fetchSubcategories = async (categoryId) => {
    // Replace this with your actual API call to fetch subcategories based on categoryId
    // const response = await apiCallToFetchSubcategories(categoryId);
    // setSubcategories(response.data);
    // Note: Make sure to handle errors and loading states appropriately
    setSubcategories(["Subcategory 1", "Subcategory 2"]); // Placeholder data
  };

  const handleCategoryClick = async (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setSubcategories([]);
    } else {
      setExpandedCategory(categoryId);
      await fetchSubcategories(categoryId);
    }
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
                {subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>{subcategory}</li>
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
