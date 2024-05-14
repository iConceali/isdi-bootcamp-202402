// src/logic/order/updateDeposit.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

const updateDeposit = async (userId, depositObject, token) => {
  try {
    validate.token(token, "Token");
    validate.number(depositObject.deposit, "Deposit");
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${userId}/deposit`,
      depositObject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update deposit:", error);
    throw new ContentError("Failed to update deposit due to an error");
  }
};

export default updateDeposit;
