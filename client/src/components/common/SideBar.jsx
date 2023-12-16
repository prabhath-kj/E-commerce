import React, { useState } from "react";

const Sidebar = ({ categories, onSelectCategory, onSelectSubcategory }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryIndex) => {
    setExpandedCategory((prev) => (prev === categoryIndex ? null : categoryIndex));
    onSelectCategory(categoryIndex);
  };

  return (
    <div className="w-1/4 px-2 text-left">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <strong onClick={() => handleCategoryClick(index)}>
              {category.name}
            </strong>
            {category.subcategories && expandedCategory === index && (
              <ul>
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>
                    <strong onClick={() => onSelectSubcategory(subcategory)}>
                      {subcategory.name}
                    </strong>
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
