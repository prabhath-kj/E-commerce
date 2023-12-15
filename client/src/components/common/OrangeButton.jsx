import React from "react";

const OrangeButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 m-1"
    >
      {children}
    </button>
  );
};

export default OrangeButton;
