// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./components/LoginPage/Login";
import Layout from "./layout";
import Register from "./components/RegisterPage/Register";
import Profile from "./components/Profile/Profile";
import Community from "./components/CommunityPage/Community";
import CommunityDetail from "./components/CommunityPage/CommunityDetail";
import MarketPage from "./components/MarketPage/MarketPage";
import InboxPage from "./components/InboxPage/Inbox";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import BookList from "./components/BookPage/BookList";
import BookDetail from "./components/BookPage/BookDetail";
import CreateBook from "./components/BookPage/CreateBook";
import Membership from "./components/Membership/Membership";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  ,
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/community",
    element: (
      <Layout>
        <Community />
      </Layout>
    ),
  },
  {
    path: "/community/:id",
    element: (
      <Layout>
        <CommunityDetail />
      </Layout>
    ),
  },
  {
    path: "/marketplace",
    element: (
      <Layout>
        <MarketPage />
      </Layout>
    ),
  },
  {
    path: "/inbox",
    element: (
      <Layout>
        <InboxPage />
      </Layout>
    ),
  },
  {
    path: "/booklist",
    element: (
      <Layout>
        <BookList />
      </Layout>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <Layout>
        <BookDetail />
      </Layout>
    ),
  },
  {
    path: "/book/create",
    element: (
      <Layout>
        <CreateBook />
      </Layout>
    ),
  },
  {
    path: "/membership",
    element: (
      <Layout>
        <Membership />
      </Layout>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
