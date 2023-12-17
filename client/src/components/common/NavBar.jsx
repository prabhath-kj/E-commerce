import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import WishList from "./WishList";
import { useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import React from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const wishProductsCount =
    useSelector((state) => state?.auth?.user?.wishlist?.length) ?? 0;
  const router = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const inputRef = useRef();
  const user = useSelector((state) => state.auth.user);

  const NAV_TITLES = [
    {
      title: "Wishlist",
      icon: HeartIcon,
      count: wishProductsCount,
    },
    {
      title: "Logout",
      icon: user ? ArrowLeftIcon : UserIcon,
    },
    // {
    //   title: "Sign In",
    //   path: "#login",
    // },
    {
      title: "Cart",
      icon: ShoppingCartIcon,
      count: 1,
    },
    ,
  ];

  useEffect(() => {
    const handleClick = (event) => {
      if (inputRef.current) {
        setHideSuggestions(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        getSuggestion();
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSuggestion = async () => {
    try {
      const response = await productApi.searchProduct({
        query: searchQuery,
      });
      setSuggestion(response);
      setHideSuggestions(true);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(setLogout());
    router("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-sky-950 opacity-100 shadow-md z-40">
        <div className="flex flex-wrap items-center justify-between px-10 py-5">
          <Link
            to={"/"}
            className="font-semibold sm:text-4xl text-lg text-white"
          >
            E COMMERCE
          </Link>
          <div className=" relative ">
            <input
              type="text"
              placeholder="Search any things..."
              className="border rounded-l px-2 py-2 focus:outline-none  "
              value={searchQuery}
              onChange={({ target }) => {
                setSearchQuery(target.value);
              }}
              ref={inputRef}
            />
            <button className="border bg-orange-400 text-white rounded-r px-2 py-2">
              Search
            </button>
            {hideSuggestions && suggestion && (
              <ul className="absolute left-0 right-0  bg-white rounded-b-lg  text-gray-700 shadow-lg overflow-y-auto scroll-smooth scrollbar-default max-h-60">
                {suggestion.length === 0 ? (
                  <li className="cursor-pointer py-3 hover:bg-gray-200 rounded">
                    <div className="flex flex-row px-1">
                      <div className="px-2">No suggestions found</div>
                    </div>
                  </li>
                ) : (
                  suggestion.map((suggestion, index) => (
                    <li
                      key={index}
                      className="cursor-pointer py-3 hover:bg-gray-200 rounded"
                    >
                      <Link to={`/product-details/${suggestion?._id}`}>
                        <div className="flex flex-row px-1">
                          <div className="px-2">{suggestion?.title}</div>
                        </div>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
          <div className="menu hidden md:block lg:block md:w-auto" id="navBar">
            <ul className="flex md:flex-row md:space-x-4">
              {NAV_TITLES?.map(({ title, icon: Icon, count }, index) => (
                <li
                  key={index}
                  className="block py-2 pl-3 pr-4 text-black font-semibold cursor-pointer relative"
                  onClick={() => {
                    if (title === "Wishlist") {
                      setOpen(true);
                    } else if (title === "Logout") {
                      handleLogout();
                    }
                    return;
                  }}
                >
                  <div className="wish-list block cursor-pointer m-2">
                    {Icon && <Icon className="w-6 h-6 text-white " />}
                    {count && (
                      <span className="bg-orange-400 text-white rounded-full px-2 py-1 absolute -top-2 -right-0">
                        {count}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="relative">
        {isOpen && <WishList pages={NAV_TITLES} setOpen={setOpen} />}
      </div>
    </>
  );
};

export default Navbar;
