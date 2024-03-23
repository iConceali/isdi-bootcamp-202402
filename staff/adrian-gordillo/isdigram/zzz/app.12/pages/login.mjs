// login.js
import logic from "../logic.mjs";

import utils from "../utils.mjs";

import Component from "../components/core/Component.mjs";
import Form from "../components/core/Form.mjs";
import Input from "../components/core/Input.mjs";
import PasswordInput from "../components/core/PasswordInput.mjs";
import SubmitButton from "../components/library/SubmitButton.mjs";
import Link from "../components/core/Link.mjs";

class Login extends Component {
  constructor() {
    super("main");

    const title = new Component("h1");
    title.setText("Login");

    const form = new Form();

    const usernameInput = new Input();
    usernameInput.setId("username");
    usernameInput.setType("username");
    usernameInput.setPlaceholder("Username");

    const passwordInput = new PasswordInput();
    passwordInput.setId("password");
    passwordInput.setPlaceholder("Password");

    const submitButton = new SubmitButton();
    submitButton.setText("Login");
    submitButton.setType("submit");
    submitButton.addClass("btn-general");

    form.onSubmit((event) => {
      event.preventDefault();

      const username = usernameInput.getValue();
      const password = passwordInput.getValue();

      try {
        logic.loginUser(username, password);

        form.reset();

        this._onUserLoggedInCallback();
      } catch (error) {
        utils.showFeedback(error);
      }
    });

    form.add(usernameInput, passwordInput, submitButton);

    const registerLink = new Link();
    registerLink.setText("New user? Sign up");
    registerLink.setHref("");

    registerLink.onClick((event) => {
      event.preventDefault();

      this._onRegisterClickCallback();
    });

    this.add(title, form, registerLink);

    this._onRegisterClickCallback = null;
    this._onUserLoggedInCallback = null;
  }

  onRegisterClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onRegisterClickCallback = callback;
  }

  onUserLoggedIn(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onUserLoggedInCallback = callback;
  }
}

export default Login;
