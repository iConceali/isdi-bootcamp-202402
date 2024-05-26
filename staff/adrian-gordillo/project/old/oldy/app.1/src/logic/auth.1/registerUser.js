// src/logic/auth/registerUser.js

import axios from "axios";

const registerUser = async (userData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/register`,
    userData
  );
  return response.data;
};

export default registerUser;
