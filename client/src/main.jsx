import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Songs from './pages/Songs.jsx';
import Playlist from './pages/Playlist.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import SpotifyPage from './pages/SpotifyPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Songs />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        element: <Playlist />
      }, {
        element: <SpotifyPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
