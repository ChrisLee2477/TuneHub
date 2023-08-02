import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutation";
import { useNavigate } from "react-router-dom";
import "./Components.css";

// import { useHistory } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Call the loginUser mutation with the form data
    loginUser({
      variables: {
        username,
        password,
      },
    })
      .then((response) => {
        console.log("User logged in successfully:", response.data);
        // Optionally, redirect the user to the dashboard or another protected page
        // history.push("/dashboard");
      })
      .catch((error) => {
        console.error("User login failed:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  function handleClick() {
    navigate("/signup");
  }
  // redirect to dash after login
  function logDash() {
    navigate("/dashboard");
  }

  return (
    <div className="div">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="lemm">Login</h2>
        <div>
          <label className="lemm" htmlFor="username">
            Username:
          </label>
          <input
            className="lemm"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="lemm" htmlFor="password">
            Password:
          </label>
          <input
            className="LEMM"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="lemm"
          onClick={(e) => logDash()}
          type="submit"
          disabled={loading}
        >
          Login
        </button>
        {error && <p>Error: {error.message}</p>}

        <button className="lemm" onClick={(e) => handleClick()}>
          Don't have an account? Sign up :)
        </button>
      </form>
    </div>
  );
};

export default Login;
