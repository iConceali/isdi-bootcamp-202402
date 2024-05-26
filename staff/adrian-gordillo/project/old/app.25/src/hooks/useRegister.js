import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../logic/auth/registerUser";

/**
 * Hook para manejar la lógica de registro.
 * @returns {Object} - Retorna el estado y las funciones para manejar el registro.
 */
const useRegister = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      navigate("/login");
    } catch (error) {
      setError(error.message || "Unexpected error occurred.");
    }
  };

  return {
    userData,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useRegister;
