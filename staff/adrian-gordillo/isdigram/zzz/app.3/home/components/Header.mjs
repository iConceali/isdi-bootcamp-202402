import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
import Button from "../../core/Button.mjs";
import Image from "../../core/Image.mjs";

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

      location.href = "../login";
    });

    // const logoutButtonImg = new Image();
    // logoutButtonImg.addClass("logout-button");
    // logoutButtonImg.setSource("../images/icon-search-off.png");

    // searchButton.add(searchImg);

    const chatButton = new Button();
    chatButton.addClass("chat-button");

    // const createPostImg = new Image();
    // createPostImg.addClass("create-post-button");
    // createPostImg.setSource("../images/icon-post-off.png");

    // createPostButton.add(createPostImg);

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

  // onCreatePostClick(callback) {
  //   this._createPostButton.onClick(callback);
  // }

  // onHomeClick(callback) {
  //   if (typeof callback !== "function")
  //     throw new TypeError("callback is not a function");

  //   this._homeButton.onClick(() => {
  //     this.replace(this._homeButton, this._chatButton);

  //     callback();
  //   });
  // }
}

export default Header;
