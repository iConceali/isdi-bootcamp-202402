import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import loginUser from "../logic/auth/loginUser";

/**
 * Hook para manejar la lógica de inicio de sesión.
 * @returns {Object} - Retorna el estado y las funciones para manejar el inicio de sesión.
 */
const useLogin = () => {
  const initialCredentialsState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialCredentialsState);
  const [error, setError] = useState("");
  const { loginUser: loginContextUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await loginUser(credentials.email, credentials.password);
      loginContextUser(token);
      navigate("/");
    } catch (error) {
      setError(error.message || "Invalid email or password!");
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
