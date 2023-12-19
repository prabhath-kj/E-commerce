import React from "react";
import { Link,useLocation } from "react-router-dom";

const Breadcrumb = ({ path }) => {
  const {pathname} =useLocation()
  // Split the path into an array
  const pathArray = path.split(">");

  return (
    <nav className="text-base  px-2 py-4">
      {pathArray.map((crumb, index) => (
        <React.Fragment key={index}>
          <Link to={crumb.trim()=="Home"?"/":pathname} className="text-black hover:underline">
            {crumb.trim()}
          </Link>
          {index < pathArray.length - 1 && <span className="mx-1"> &gt; </span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
