import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const FallbackUi = () => <div>Loading...</div>;

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<FallbackUi />}>
        <App />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<FallbackUi />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<FallbackUi />}>
            <PrivateRoute children={<Home />} />
          </Suspense>
        ),
      },
      {
        path: "product-details/:productName",
        element: (
          <Suspense fallback={<FallbackUi />}>
            <PrivateRoute children={<ProductPage />} />
          </Suspense>
        ),
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
