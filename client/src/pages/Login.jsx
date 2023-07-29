import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutation"; 
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Login;