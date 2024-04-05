import { logger, showFeedback } from "../utils";

import logic from "../logic";

function Register(props) {
  const handleSubmit = (event) => {
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

      props.onUserRegistered();
    } catch (error) {
      showFeedback(error);
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();

    props.onLoginClick();
  };

  logger.debug("Register -> render");

  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Name" />

        <input type="date" id="birthdate" placeholder="Birthdate" />

        <input type="email" id="email" placeholder="Email" />

        <input type="text" id="username" placeholder="Username" />

        <input type="password" id="password" placeholder="Password" />

        <button className="btn-general" type="submit">
          Register
        </button>
      </form>

      <a href="" onClick={handleLoginClick}>
        Have an account? Sign in
      </a>
    </main>
  );
}

export default Register;
