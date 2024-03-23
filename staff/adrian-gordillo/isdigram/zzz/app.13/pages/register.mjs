// register.js
import logic from "../logic.mjs";

import utils from "../utils";

import Component from "../components/core/Component.mjs";
import Form from "../components/core/Form.mjs";
import Input from "../components/core/Input.mjs";
import DateInput from "../components/core/DateInput.mjs";
import EmailInput from "../components/core/EmailInput.mjs";
import PasswordInput from "../components/core/PasswordInput.mjs";
import SubmitButton from "../components/library/SubmitButton.mjs";
import Link from "../components/core/Link.mjs";

class Register extends Component {
  constructor() {
    super("main");

    const title = new Component("h1");
    title.setText("Register");

    const form = new Form();

    const nameInput = new Input();
    nameInput.setId("name");
    nameInput.setPlaceholder("Name");

    const birthdateInput = new DateInput();
    birthdateInput.setId("birthdate");

    const emailInput = new EmailInput();
    emailInput.setId("email");
    emailInput.setPlaceholder("Email");

    const usernameInput = new Input();
    usernameInput.setId("username");
    usernameInput.setPlaceholder("Username");

    const passwordInput = new PasswordInput();
    passwordInput.setId("password");
    passwordInput.setPlaceholder("Password");

    const submitButton = new SubmitButton();
    submitButton.setText("Register");
    submitButton.setType("submit");
    submitButton.addClass("btn-general");

    form.onSubmit((event) => {
      event.preventDefault();

      const name = nameInput.getValue();
      const birthdate = birthdateInput.getValue();
      const email = emailInput.getValue();
      const username = usernameInput.getValue();
      const password = passwordInput.getValue();

      try {
        logic.registerUser(name, birthdate, email, username, password);

        form.reset();

        this._onUserRegisteredCallback();
      } catch (error) {
        utils.showFeedback(error);
      }
    });

    form.add(
      nameInput,
      birthdateInput,
      emailInput,
      usernameInput,
      passwordInput,
      submitButton
    );

    const loginLink = new Link();
    loginLink.setText("Have an account? Sign in");
    loginLink.setHref("");

    loginLink.onClick((event) => {
      event.preventDefault();

      this._onLoginClickCallback();
    });

    this.add(title, form, loginLink);

    this._onLoginClickCallback = null;
    this._onUserRegisteredCallback = null;
  }

  onLoginClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onLoginClickCallback = callback;
  }

  onUserRegistered(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onUserRegisteredCallback = callback;
  }
}

export default Register;
