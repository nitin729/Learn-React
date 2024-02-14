import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthGuard, Login } from "./components/index.js";

import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthGuard authentication={false}>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthGuard authentication={false}>
            <Signup />
          </AuthGuard>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthGuard authentication>
            <AllPosts />
          </AuthGuard>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthGuard authentication>
            <AddPost />
          </AuthGuard>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthGuard authentication>
            <EditPost />
          </AuthGuard>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
