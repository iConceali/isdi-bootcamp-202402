// app/src/userContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { configureAxios } from "./utils/axiosConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token")); // Agregar estado para el token
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  if (token) {
    configureAxios(token); // Configura Axios con el token correcto al cargar la app
  }

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem("token"); // Elimina el token de sessionStorage
    setToken(null); // Asegurarse de eliminar también el token del estado
    setIsTokenExpired(false);
  };

  const loginUser = (token) => {
    const tokenData = parseJwt(token); // Parsea el token para obtener la información necesaria

    if (tokenData && tokenData.exp * 1000 < Date.now()) {
      // Verifica si el token ha expirado
      logoutUser(); // Si el token ha expirado, cierra la sesión del usuario
      return;
    }

    sessionStorage.setItem("token", token);
    setToken(token); // Guarda el token en el estado
    configureAxios(token); // Aplica la configuración de Axios cada vez que el usuario inicia sesión.
  };

  useEffect(() => {
    loginUser(token);
  }, [token]);

  // Comprobar si el token ha expirado
  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenData = token ? parseJwt(token) : null;
      if (tokenData && tokenData.exp * 1000 < Date.now()) {
        setIsTokenExpired(true); // Marca el token como expirado
        logoutUser(); // Cierra la sesión del usuario automáticamente
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Comprobar cada minuto
    return () => clearInterval(interval);
  }, [token]);

  return (
    <UserContext.Provider
      value={{ token, tokenExpired: isTokenExpired, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
