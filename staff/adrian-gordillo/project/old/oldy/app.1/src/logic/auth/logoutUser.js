// src/logic/auth/logoutUser.js

const logoutUser = () => {
  try {
    sessionStorage.removeItem("token");
  } catch (error) {
    console.error("Failed to logout user:", error);
  }
};

export default logoutUser;
