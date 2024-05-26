// src/hooks/useRegister.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../logic/auth/registerUser";

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
    setError("");
    try {
      await registerUser(userData);
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Unexpected error occurred.";
      setError(errorMsg);
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
