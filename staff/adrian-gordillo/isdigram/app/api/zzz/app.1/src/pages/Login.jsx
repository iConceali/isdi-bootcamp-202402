import utils from "../utils";

import logic from "../logic";

import { Component } from "react";

class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const form = event.target;
            const username = form.username.value;
            const password = form.password.value;

            try {
              logic.loginUser(username, password);

              form.reset();

              this.props.onUserLoggedIn();
            } catch (error) {
              utils.showFeedbacjk(error);
            }
          }}
        >
          <label htmlFor="username">Username</label>
          <input type="text" id="username"></input>

          <label htmlFor="password">Password</label>
          <input type="password" id="password"></input>

          <button className="round-button" type="submit">
            Login
          </button>
        </form>

        <a
          href=""
          onClick={(event) => {
            event.preventDefault();

            this.props.onRegisterClick();
          }}
        >
          Register
        </a>
      </main>
    );
  }
}

export default Login;
