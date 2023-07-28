import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "../src/components/Spotify";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import SignupPage from "./pages/SignupPage";
import Analytics from "./pages/Analytics.jsx";
import Comment from "./pages/Comment.jsx";
import Product from "./pages/Product.jsx";
import ProductList from "./pages/ProductList.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Nav />
      <Chat />
      <Login />
      <Signup />
      <Spotify /> */}

      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signuppage" element={<SignupPage />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productList" element={<ProductList />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
