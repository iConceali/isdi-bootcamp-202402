// app/src/userContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { configureAxios } from "./utils/axiosConfig";
import { parseJwt } from "./utils/helpers";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  if (token) {
    configureAxios(token);
  }

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setIsTokenExpired(false);
  };

  const handleLoginUser = (token) => {
    const tokenData = parseJwt(token);

    if (tokenData && tokenData.exp * 1000 < Date.now()) {
      logoutUser();
      return;
    }

    sessionStorage.setItem("token", token);
    setToken(token);
    configureAxios(token);
  };

  useEffect(() => {
    handleLoginUser(token);
  }, [token]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenData = token ? parseJwt(token) : null;
      if (tokenData && tokenData.exp * 1000 < Date.now()) {
        setIsTokenExpired(true);
        logoutUser();
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        tokenExpired: isTokenExpired,
        loginUser: handleLoginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
