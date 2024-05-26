// src/logic/order/addOrder.js

import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

const addOrder = async (userId, orderData, token) => {
  try {
    validate.token(token, "Token");
    validate.text(userId, "User ID");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/orders/${userId}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Asegúrate de devolver la orden correctamente
    if (!response.data.order) {
      throw new ContentError("Invalid response from the server");
    }

    return response.data.order;
  } catch (error) {
    console.error("Failed to add order:", error);
    throw new ContentError("Failed to add order due to an error");
  }
};

export default addOrder;
