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
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />
      <Chat />
      <Login />
      <Signup />
      <Spotify />
    </>
  );
}

export default App;
