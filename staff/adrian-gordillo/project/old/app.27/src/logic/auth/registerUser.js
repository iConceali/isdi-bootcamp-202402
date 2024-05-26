// app/src/logic/auth/registerUser.js

import { validate, errors } from "com";

const registerUser = async ({ name, email, password }) => {
  try {
    validate.text(name, "name", true);
    validate.text(email, "email", true);
    validate.password(password);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (response.status !== 201) {
      const errorData = await response.json();
      const { error, message } = errorData;

      const ErrorConstructor = errors[error] || Error;
      throw new ErrorConstructor(message);
    }
  } catch (error) {
    console.error("Failed to register user:", error);
    throw error; // Re-throw the error after logging it
  }
};

export default registerUser;
