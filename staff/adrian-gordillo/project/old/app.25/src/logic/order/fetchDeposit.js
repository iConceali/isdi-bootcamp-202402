// src/logic/order/fetchDeposit.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

// Función para obtener el depósito del usuario
const fetchDeposit = async (userId, token) => {
  try {
    validate.token(token, "Token");
    validate.text(userId, "User ID");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${userId}/deposit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.deposit;
  } catch (error) {
    console.error("Failed to fetch deposit:", error);
    throw new ContentError("Failed to fetch deposit due to an error");
  }
};

export default fetchDeposit;
