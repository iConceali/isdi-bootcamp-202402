import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { Component } from "react";

class Register extends Component {
  constructor() {
    logger.debug("Register");

    super();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const birthdate = form.birthdate.value;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;

    try {
      logic.registerUser(name, birthdate, email, username, password);

      form.reset();

      this.props.onUserRegistered();
    } catch (error) {
      showFeedback(error);
    }
  };

  handleLoginClick = (event) => {
    event.preventDefault();

    this.props.onLoginClick();
  };

  render() {
    logger.debug("Register -> render");

    return (
      <main>
        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" id="name" placeholder="Name" />

          <input type="date" id="birthdate" placeholder="Birthdate" />

          <input type="email" id="email" placeholder="Email" />

          <input type="text" id="username" placeholder="Username" />

          <input type="password" id="password" placeholder="Password" />

          <button className="btn-general" type="submit">
            Register
          </button>
        </form>

        <a href="" onClick={this.handleLoginClick}>
          Have an account? Sign in
        </a>
      </main>
    );
  }
}

export default Register;
