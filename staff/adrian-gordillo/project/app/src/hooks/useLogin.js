// src/hooks/useLogin.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import loginUser from "../logic/auth/loginUser";

const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { loginUser: loginUserContext } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await loginUser(credentials.email, credentials.password);
      if (token) {
        sessionStorage.setItem("token", token);
        loginUserContext(token); // Actualizar el contexto
        navigate("/");
      } else {
        setError("No se pudo iniciar sesión, por favor intente de nuevo.");
        navigate("/login");
      }
    } catch (error) {
      setError("Invalid email or password!");
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return {
    credentials,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
