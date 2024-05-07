// app/src/userContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { configureAxios } from "./utils/axiosConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      configureAxios(); // Asegúrate de que Axios esté configurado con el token correcto al cargar la app.
      return JSON.parse(savedUser);
    }
    return null;
  });

  const [tokenExpired, setTokenExpired] = useState(false);

  const logoutUser = () => {
    sessionStorage.removeItem("token"); // Elimina el token de sessionStorage
    sessionStorage.removeItem("user"); // Elimina el usuario de sessionStorage
    setUser(null); // Actualiza el estado global del usuario a null
    setTokenExpired(false);
  };

  const loginUser = (userData, token) => {
    const tokenData = parseJwt(token); // Parsea el token para obtener la información necesaria

    if (tokenData && tokenData.exp * 1000 < Date.now()) {
      // Verifica si el token ha expirado
      logoutUser(); // Si el token ha expirado, cierra la sesión del usuario
      return;
    }

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    configureAxios(); // Aplica la configuración de Axios cada vez que el usuario inicia sesión.
  };

  // Comprobar si el token ha expirado
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = sessionStorage.getItem("token");
      const tokenData = token ? parseJwt(token) : null;
      if (tokenData && tokenData.exp * 1000 < Date.now()) {
        setTokenExpired(true); // Marca el token como expirado
        logoutUser(); // Cierra la sesión del usuario automáticamente
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 10000); // Comprobar cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, tokenExpired, setUser, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
