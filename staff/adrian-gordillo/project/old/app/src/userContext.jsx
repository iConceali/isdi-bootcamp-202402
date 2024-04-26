// app/src/userContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intenta obtener el nombre del usuario del almacenamiento local al iniciar
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logoutUser = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    localStorage.removeItem("user"); // Elimina el usuario de localStorage
    setUser(null); // Actualiza el estado global del usuario a null
  };

  // Guardar el nombre del usuario en el almacenamiento local cada vez que cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {" "}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
