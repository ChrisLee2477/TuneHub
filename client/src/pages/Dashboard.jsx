import React from "react";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
import Comment from "./Comment";
import Spotify from "../components/Spotify";
import "../components/Components.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  function returnLogin() {
    navigate("/");
  }
  return (
    <>
      <button className="home" onClick={(e) => returnLogin()}>
        Home
      </button>

      <header className="header">Welcome To TuneHubs!!</header>

      <Comment />

      <Spotify />
    </>
  );
}
