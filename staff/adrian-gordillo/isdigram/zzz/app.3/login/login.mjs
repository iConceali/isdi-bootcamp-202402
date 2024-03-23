// login.js
import logic from "../logic.mjs";

import utils from "../utils.mjs";

if (logic.isUserLoggedIn()) location.href = "../home";
else {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    console.log("form submit");

    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    try {
      logic.loginUser(username, password);

      form.reset();

      location.href = "../home";
    } catch (error) {
      utils.showFeedback(error);
    }
  });
}
