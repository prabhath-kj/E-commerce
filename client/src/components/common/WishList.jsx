import React, { useState } from "react";
import NavLink from "./NavLink";
import { XMarkIcon } from "@heroicons/react/24/solid";

const WishList = ({ pages, setOpen }) => {
  return (
    <div className={`absolute right-0 top-0 mt-20 `}>
      <button className="absolute top-0 right-0" onClick={() => setOpen(false)}>
        <XMarkIcon className="w-6 h-6 text-black" />
      </button>
      <ul className="flex flex-col items-center py-4">
        {pages.map((title, index) => {
          return <li key={index}>{NavLink(title)}</li>;
        })}
      </ul>
    </div>
  );
};

export default WishList;
