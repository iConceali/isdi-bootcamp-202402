import { Component } from "react";
import Landing from "./pages/Landing.mjs";
import Login from "./pages/Login.mjs";
import Register from "./pages/Register.mjs";
import Home from "./pages/Home.mjs";

class App extends Component {
  constructor() {
    super();

    this.state = { view: "landing" };
  }

  render() {
    if (this.state.view === "landing")
      return (
        <Landing
          onLoginClick={() => this.setState({ view: "login" })}
          onRegisterClick={() => this.setState({ view: "register" })}
        />
      );
    else if (this.state.view === "login")
      return (
        <Login
          onRegisterClick={() => this.setState({ view: "register" })}
          onUserLoggedIn={() => this.setState({ view: "home" })}
        />
      );
    else if (this.state.view === "register")
      return (
        <Register
          onLoginClick={() => this.setState({ view: "login" })}
          onUserRegistered={() => this.setState({ view: "login" })}
        />
      );
    else if (this.state.view === "home") return <Home />;
    else return <h1>🧨</h1>;
  }
}

export default App;
