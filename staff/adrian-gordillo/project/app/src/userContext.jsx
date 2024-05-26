// app/src/userContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { configureAxios } from "./utils/axiosConfig";
import { validate } from "com";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(storedToken !== "null" ? storedToken : "");
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  if (token) {
    configureAxios(token);
  }

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    setToken("");
    setIsTokenExpired(false);
  };

  const handleLoginUser = (newToken) => {
    try {
      validate.token(newToken, "User token");
      sessionStorage.setItem("token", newToken);
      setToken(newToken);
      configureAxios(newToken);
    } catch (error) {
      setIsTokenExpired(true);
      logoutUser();
    }
  };

  useEffect(() => {
    if (token) {
      handleLoginUser(token);
    }
  }, [token]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      try {
        if (token) {
          validate.token(token, "User token");
        }
      } catch (error) {
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
        isTokenExpired,
        loginUser: handleLoginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
