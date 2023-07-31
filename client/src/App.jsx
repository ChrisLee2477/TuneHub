import { useState } from "react";
<<<<<<< HEAD
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spotify from "../src/components/Spotify";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Nav from "./components/Nav";
import React from "react";

=======
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
>>>>>>> 97ff4f36c60f8eb6a5677c00d6c155f501d0fa8c
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import SpotifyPage from "./pages/SpotifyPage";
import Comment from "./pages/Comment.jsx";

function App() {
  const [count, setCount] = useState(0);

  // Create the HTTP link to your GraphQL server
  const httpLink = createHttpLink({
    uri: "/graphql",
  });

<<<<<<< HEAD
      <BrowserRouter>
        {/* <Sidebar> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/spotifypage" element={<SpotifyPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
        </Routes>
        {/* </Sidebar> */}
      </BrowserRouter>
    </>
  );
=======
  // Create the Apollo Client
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <>
        {/* other components */}
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/spotifypage" element={<SpotifyPage />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
        </>
    </ApolloProvider>
  )
>>>>>>> 97ff4f36c60f8eb6a5677c00d6c155f501d0fa8c
}

export default App;