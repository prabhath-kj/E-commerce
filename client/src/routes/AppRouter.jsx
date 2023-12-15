import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import { AuthPage, Home, ProductPage } from "../pages";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product-page/:productName",
        element: <ProductPage />,
      },
    ],
  },
]);

export default AppRouter