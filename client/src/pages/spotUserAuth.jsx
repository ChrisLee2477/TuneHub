import React, { useEffect } from "react";

const userAuth = () => {
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const tokens = getParamsFromHash(hash);
      localStorage.setItem("token", tokens.access_token);
      setToken(tokens.access_token);
      console.log("success");
    }
  }, []);
};

export default userAuth;
