// app/src/userContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

import { configureAxios } from "./utils/axiosConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      configureAxios(); // Asegúrate de que Axios esté configurado con el token correcto al cargar la app.
      return JSON.parse(savedUser);
    }
    return null;
  });

  const logoutUser = () => {
    sessionStorage.removeItem("token"); // Elimina el token de sessionStorage
    sessionStorage.removeItem("user"); // Elimina el usuario de sessionStorage
    setUser(null); // Actualiza el estado global del usuario a null
  };

  const loginUser = (userData, token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    configureAxios(); // Aplica la configuración de Axios cada vez que el usuario inicia sesión.
  };

  // Observa el estado del usuario y guarda en sessionStorage cuando cambie
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
