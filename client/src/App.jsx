import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "../src/components/Spotify";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashspot from "./components/SpotifyDash";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return code ? <Dashspot code={code} /> : <Spotify />;
  // (

  //   (
  //     <>
  //       <Chat />
  //       <Login />
  //       <Signup />
  //       <Spotify />
  //     </>
  //   )
  // );
}

export default App;
