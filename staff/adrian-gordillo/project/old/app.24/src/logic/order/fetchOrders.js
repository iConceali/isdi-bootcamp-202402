// src/logic/order/fetchOrders.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

const fetchOrders = async (userId, token) => {
  try {
    validate.token(token, "Token");
    validate.text(userId, "User ID");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/orders/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new ContentError("Failed to fetch orders due to an error");
  }
};

export default fetchOrders;
