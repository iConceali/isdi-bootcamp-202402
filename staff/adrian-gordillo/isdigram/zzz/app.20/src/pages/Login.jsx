import { logger, showFeedback } from "../utils";

import logic from "../logic";

function Login(props) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const username = form.username.value;
    const password = form.password.value;

    logger.debug("Login -> handleSubmit", username, password);

    try {
      logic.loginUser(username, password, (error) => {
        if (error) {
          showFeedback(error);

          return;
        }

        form.reset();

        props.onUserLoggedIn();
      });
    } catch (error) {
      showFeedback(error);
    }
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();

    props.onRegisterClick();
  };

  logger.debug("Login -> render");

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" id="username" placeholder="Username" />

        <input type="password" id="password" placeholder="Password" />

        <button className="btn-general" type="submit">
          Login
        </button>
      </form>

      <a href="" onClick={handleRegisterClick}>
        New user? Sign up
      </a>
    </main>
  );
}

export default Login;
