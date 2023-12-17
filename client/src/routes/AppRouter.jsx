import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import { AuthPage, Home, ProductPage,ErrorPage } from "../pages";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product-detils/:productName",
        element: <ProductPage />,
      },
    ],
  },
]);

export default AppRouter