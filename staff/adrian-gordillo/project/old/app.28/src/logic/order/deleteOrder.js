// src/logic/order/deleteOrder.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

const deleteOrder = async (userId, orderId, token) => {
  try {
    validate.token(token, "Token");
    validate.text(userId, "User ID");
    validate.text(orderId, "Order ID");

    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/orders/${userId}/order/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error("Failed to delete order:", error);
    throw new ContentError("Failed to delete order due to an error");
  }
};

export default deleteOrder;
