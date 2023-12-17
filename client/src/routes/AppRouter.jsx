import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AuthPage, Home, ProductPage, ErrorPage } from "../pages";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import PrivateRoute from "./PrivateRoute";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PrivateRoute children={<Home />} />,
      },
      {
        path: "product-detils/:productName",
        element: <PrivateRoute children={<ProductPage />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

export default AppRouter;
