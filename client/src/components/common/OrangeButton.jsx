import React from "react";

const OrangeButton = ({ setModalType, children }) => {
  return (
    <button
      onClick={() =>
        setModalType(`${children.toLowerCase().replace(" ", "-")}`)
      }
      className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 m-1"
    >
      {children}
    </button>
  );
};

export default OrangeButton;
