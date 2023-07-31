import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";


export default function Dashboard() {
  return (
    <>
      <header>Welcome To TuneHubs!!</header>
      <Login />
      <Signup />
    </>
  );
}
