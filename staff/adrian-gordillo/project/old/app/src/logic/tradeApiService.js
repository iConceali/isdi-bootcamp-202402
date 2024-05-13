// tradeApiService.js
import axios from "axios";

export const deleteTrade = async (
  id,
  token,
  trades,
  setTrades,
  updateParameters,
  parameters
) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const updatedTrades = trades.filter((trade) => trade._id !== id);
      setTrades(updatedTrades);
      updateParameters(updatedTrades, parameters.deposit);
    }
  } catch (error) {
    console.error("Failed to delete trade:", error);
  }
};
