import { logger } from "./utils";

import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import isUserLoggedIn from "./logic/isUserLoggedIn";

function App() {
  const [view, setView] = useState(isUserLoggedIn() ? "home" : "landing");

  const goToLogin = () => setView("login");

  const handleLoginClick = () => goToLogin();

  const handleRegisterClick = () => setView("register");

  const handleUserLoggedIn = () => setView("home");

  const handleUserLoggedOut = () => goToLogin();

  logger.debug("App -> render");

  return (
    <>
      {view === "landing" && (
        <Landing
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
        />
      )}
      {view === "login" && (
        <Login
          onRegisterClick={handleRegisterClick}
          onUserLoggedIn={handleUserLoggedIn}
        />
      )}
      {view === "register" && (
        <Register
          onLoginClick={handleLoginClick}
          onUserRegistered={handleLoginClick}
        />
      )}
      {view === "home" && <Home onUserLoggedOut={handleUserLoggedOut} />}
    </>
  );
}

export default App;
