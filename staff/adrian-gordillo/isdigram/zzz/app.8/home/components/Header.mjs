import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
import Button from "../../core/Button.mjs";
import Image from "../../core/Image.mjs";

class Header extends Component {
  constructor() {
    super("header");

    const avatarImg = new Image();
    avatarImg.addClass("user-avatar");
    avatarImg.setSource("../images/avatar-empty.webp");

    const backButton = new Button();
    backButton.addClass("back-button");

    const logoutButton = new Button();
    logoutButton.addClass("logout-button");

    logoutButton.onClick(() => {
      logic.logoutUser();

      location.href = "../login";
    });

    const chatButton = new Button();
    chatButton.addClass("chat-button");

    this.add(avatarImg, logoutButton, chatButton);

    backButton.onClick(() => {
      location.href = "../home";

      this.remove(backButton);
    });

    this._avatarImg = avatarImg;
    this._logoutButton = logoutButton;
    this._chatButton = chatButton;
    this._backButton = backButton;
  }

  onChatClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._chatButton.onClick(() => {
      this.add(this._backButton);
      callback();
    });
  }
}

export default Header;
