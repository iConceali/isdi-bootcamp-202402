// src/logic/auth/logoutUser.js

const logoutUser = () => {
  sessionStorage.removeItem("token");
};

export default logoutUser;
