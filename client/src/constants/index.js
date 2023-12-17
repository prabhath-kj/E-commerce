import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const NAV_TITLES = [
  {
    title: "Wishlist",
    icon: HeartIcon,
    count: 3, // Example count for wishlist
  },
  {
    title: "User",
    icon: UserIcon,
  },
  // {
  //   title: "Sign In",
  //   path: "#login",
  // },
  {
    title: "Cart",
    icon: ShoppingCartIcon,
    count: 5, // Example count for cart
  },
  ,
];

export const buttonNames = ["Add Category", "Add SubCategory", "Add Product"];
export const DUMMY_IMAGE =
  "https://t3.ftcdn.net/jpg/03/45/05/92/240_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
