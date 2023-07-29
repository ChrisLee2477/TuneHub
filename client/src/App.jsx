import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "../src/components/Spotify";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Nav from "./components/Nav";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import SignupPage from "./pages/SignupPage";
import SpotifyPage from "./pages/SpotifyPage";
import Comment from "./pages/Comment.jsx";
import Playlist from "./pages/Playlist";
import Songs from "./pages/Songs";

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
            <Route path="/spotifypage" element={<SpotifyPage />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/songs" element={<Songs />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
