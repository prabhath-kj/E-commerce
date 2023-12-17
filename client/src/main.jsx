import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={AppRouter} />
      </ErrorBoundary>
    </Provider>
    <ToastContainer />
  </>
);
