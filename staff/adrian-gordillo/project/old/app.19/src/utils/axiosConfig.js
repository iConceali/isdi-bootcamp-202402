// app/src/utils/axiosConfig.js

import axios from "axios";

export const configureAxios = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
