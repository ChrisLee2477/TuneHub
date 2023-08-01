import { useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import SpotifyPage from "./pages/SpotifyPage";
import Comment from "./pages/Comment.jsx";
import Signup from "./components/Signup";
import Dashspot from "./components/SpotifyDash";
import Nav from "./components/Nav";
import Login from "./components/Login";

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
              <Route path="/spotifypage" element={<SpotifyPage />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </>
    </ApolloProvider>
  );
}

export default App;
