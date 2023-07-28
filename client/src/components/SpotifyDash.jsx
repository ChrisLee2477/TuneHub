import React from "react";
import spotifyAuth from "./SpotifyAuth";

export default function Dashspot({ code }) {
  const accessToken = spotifyAuth(code);
  return <div>{code}</div>;
}
