import { Component } from "react";

class Landing extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <h1>Landing</h1>
        <a
          href=""
          onClick={(event) => {
            event.preventDefault();

            this.props.onLoginClick();
          }}
        >
          Login
        </a>
        or
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

export default Landing;
