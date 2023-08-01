import React from "react";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
import Comment from "./Comment";
import Spotify from "../components/Spotify";

export default function Dashboard() {
  return (
    <>
      <header>Welcome To TuneHubs!!</header>
      <Comment />
      <Spotify />
    </>
  );
}
