import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    fetch("/callback", {
      code,
    })
      .then((res) => {
        console.log(res);
        // setAccessToken(res.data.accessToken);
        // setRefreshToken(res.data.refreshToken);
        // setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        // window.location = "/";
        console.error(err);
      });
  }, [code]);

  return accessToken;
}
