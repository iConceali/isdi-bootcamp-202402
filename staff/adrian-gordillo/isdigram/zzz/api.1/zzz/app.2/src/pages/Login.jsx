import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { Component } from "react";

class Login extends Component {
  constructor() {
    logger.debug("Login");

    super();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const username = form.username.value;
    const password = form.password.value;

    logger.debug("Login -> handleSubmit", username, password);

    try {
      logic.loginUser(username, password);

      form.reset();

      this.props.onUserLoggedIn();
    } catch (error) {
      showFeedback(error);
    }
  };

  handleRegisterClick = (event) => {
    event.preventDefault();

    this.props.onRegisterClick();
  };

  render() {
    logger.debug("Login -> render");

    return (
      <main>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" id="username" placeholder="Username" />

          <input type="password" id="password" placeholder="Password" />

          <button className="btn-general" type="submit">
            Login
          </button>
        </form>

        <a href="" onClick={this.handleRegisterClick}>
          New user? Sign up
        </a>
      </main>
    );
  }
}

export default Login;
