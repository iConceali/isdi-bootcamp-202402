import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { Component } from "react";

class Header extends Component {
  constructor() {
    logger.debug("Header");

    super();
  }
  componentDidMount() {
    logger.debug("Header -> componentDidMount");
  }

  componentWillUnmount() {
    logger.debug("Header -> componentWillUnmount");
  }

  //       render() {
  //         logger.debug("EditPost -> render");

  //         return (
  //             <header>
  //                 <img className="user-avatar" src="../src/assets/avatar-empty.webp" />

  //                 <button className="back-button"></button>

  //                 <button className="logout-button"></button>
  //                 <button className="chat-button"></button>
  //              </header>

  //     backButton.onClick(() => {
  //       location.href = "../home";

  //       this.remove(backButton);
  //     });

  //   onChatClick(callback) {
  //     if (typeof callback !== "function")
  //       throw new TypeError("callback is not a function");

  //     this._chatButton.onClick(() => {
  //       this.add(this._backButton);
  //       callback();
  //     });
  //   }
  //   );
  // }
}

export default Header;
