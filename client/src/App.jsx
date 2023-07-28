import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "../src/components/Spotify";

function App() {
  const [count, setCount] = useState(0);

  return <Spotify />;
}

export default App;
