// app/src/utils/axiosConfig.js

import axios from "axios";

export const configureAxios = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
