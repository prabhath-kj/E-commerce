import React from "react";

const OrangeButton = ({ setModalType, children }) => {
  return (
    <button
      onClick={() => {
        setModalType
          ? setModalType(`${children.toLowerCase().replace(" ", "-")}`)
          : null;
      }}
      className="bg-orange-400 hover:bg-orange-500 text-white font-normal py-2 px-4 rounded-full m-1"
    >
      {children}
    </button>
  );
};

export default OrangeButton;
