import { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import SignupPage from "./pages/SignupPage";
import SpotifyPage from "./pages/SpotifyPage";
import Comment from "./pages/Comment.jsx";
import Playlist from "./pages/Playlist";
import Songs from "./pages/Songs";

function App() {
  const [count, setCount] = useState(0);

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
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signuppage" element={<SignupPage />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/spotifypage" element={<SpotifyPage />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/songs" element={<Songs />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </>
    </ApolloProvider>
  );
}

export default App;