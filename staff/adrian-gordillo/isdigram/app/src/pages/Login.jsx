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
        <h1>Login</h1>

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
          <input type="text" id="username" placeholder="Username"></input>

          <input type="password" id="password" placeholder="Password"></input>

          <button className="btn-general" type="submit">
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
          New user? Sign up
        </a>
      </main>
    );
  }
}

export default Login;
