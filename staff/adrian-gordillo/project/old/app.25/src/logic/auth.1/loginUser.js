// src/logic/auth/loginUser.js

import { validate, errors } from "com";

async function loginUser(email, password) {
  validate.email(email, "email", true);
  validate.password(password);

  const user = { email, password };
  const json = JSON.stringify(user);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  if (response.status === 200) {
    const data = await response.json();
    return data.token;
  } else {
    const body = await response.json();
    const { error, message } = body;
    const constructor = errors[error];
    throw new constructor(message);
  }
}

export default loginUser;
