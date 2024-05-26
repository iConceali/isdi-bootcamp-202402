import axios from "axios";
import { validate, errors } from "com";
const { ContentError } = errors;

const updateDeposit = async (userId, deposit, token) => {
  try {
    validate.token(token, "Token");
    validate.number(deposit, "Deposit");
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${userId}/deposit`,
      { deposit }, // Enviar el depósito como parte de un objeto
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Asegúrate de devolver el valor del depósito
  } catch (error) {
    console.error("Failed to update deposit:", error);
    throw new ContentError("Failed to update deposit due to an error");
  }
};

export default updateDeposit;
