// tradeService.js

import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchDeposit = async (token) => {
  if (!token) {
    console.error("No token available");
    throw new Error("Authentication token is missing");
  }

  try {
    const response = await axios.get(`${API_URL}/users/deposit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.deposit;
  } catch (error) {
    console.error(
      "Failed to fetch deposit:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchTrades = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch trades:", error);
    return [];
  }
};

export const addTrade = async (tradeData, token) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, tradeData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add trade:", error);
    throw error;
  }
};

export const updateDeposit = async (depositObject, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/deposit`,
      depositObject,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update deposit:", error);
    throw error;
  }
};
