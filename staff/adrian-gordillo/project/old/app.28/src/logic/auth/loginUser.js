// app/src/logic/auth/loginUser.js

import { validate, errors } from "com";

const loginUser = async (email, password) => {
  try {
    validate.text(email, "email", true);
    validate.password(password);

    const user = { email, password };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.token;
    }

    const errorData = await response.json();
    const { error, message } = errorData;

    const ErrorConstructor = errors[error] || Error;
    throw new ErrorConstructor(message);
  } catch (error) {
    console.error("Failed to login user:", error);
    throw error; // Re-throw the error after logging it
  }
};

export default loginUser;
