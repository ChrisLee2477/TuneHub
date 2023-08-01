import { useEffect, useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Comment from "./pages/Comment.jsx";
import Signup from "./components/Signup";
// import Nav from "./components/Nav";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import SpotUserAuth from "./pages/spotUserAuth";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  // Create the HTTP link to your GraphQL server
  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  // Create the Apollo Client
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  // ==== [Spotify API Access Token] ====
  const client_id = "8000e5a74ec242939a1246f4295be86c"; // Your client id
  const client_secret = "0a652098d8db4e21b13c660584ad0ba0"; // Your secret

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret,
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  return (
    <ApolloProvider client={client}>
      <>
        {/* other components */}
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/spotify" element={<Spotify />} />
              <Route path="/callback" element={<SpotUserAuth />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </>
    </ApolloProvider>
  );
}

export default App;
