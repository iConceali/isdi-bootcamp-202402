import utils from "../../utils.mjs";

import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
import Image from "../../core/Image.mjs";

class UserList extends Component {
  constructor() {
    super("ul");
    this.addClass("user-list");

    try {
      const users = logic.retrieveUsersWithStatus();

      let chatPanel = null;

      users.forEach((user) => {
        const item = new Component("li");

        item.addClass("user-list__item");

        if (user.status === "online") item.addClass("user-list__item--online");
        else item.addClass("user-list__item--offline");

        const avatarImg = new Image();
        avatarImg.setSource(user.avatar);
        avatarImg.setAlt(user.username);

        const avatarText = new Component("p");
        avatarText.setText(user.username);

        item.add(avatarImg, avatarText);
        this.add(item);

        item.onClick(() => this._onUserClickCallback(user.id));

        this.add(item);
      });
    } catch (error) {
      utils.showFeedback(error);
    }

    this._onUserClickCallback = null;
  }

  onUserClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onUserClickCallback = callback;
  }
}

export default UserList;
