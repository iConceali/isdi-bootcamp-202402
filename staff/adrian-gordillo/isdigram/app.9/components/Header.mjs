import logic from "../logic.mjs";

import Component from "./core/Component.mjs";
import Button from "./core/Button.mjs";
import Image from "./core/Image.mjs";

class Header extends Component {
  constructor() {
    super("header");

    // this.addClass("header");

    const avatarImg = new Image();
    avatarImg.addClass("user-avatar");
    avatarImg.setSource("../images/avatar-empty.webp");

    const backButton = new Button();
    backButton.addClass("back-button");

    const logoutButton = new Button();
    logoutButton.addClass("logout-button");

    logoutButton.onClick(() => {
      logic.logoutUser();

      this._onLogoutCallback();
    });

    const chatButton = new Button();
    chatButton.addClass("chat-button");

    chatButton.onClick(() => {
      this.add(this._backButton);

      this._onChatClickCallback();
    });

    this.add(avatarImg, logoutButton, chatButton);

    backButton.onClick(() => {
      this.remove(backButton);

      this._onHomeClickCallback();
    });

    this._avatarImg = avatarImg;
    this._logoutButton = logoutButton;
    this._chatButton = chatButton;
    this._backButton = backButton;

    this._onHomeClickCallback = null;
    this._onChatClickCallback = null;
    this._onLogoutCallback = null;
  }

  onChatClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onChatClickCallback = callback;
  }

  onHomeClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onHomeClickCallback = callback;
  }

  onLogoutClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onLogoutCallback = callback;
  }
}

export default Header;
