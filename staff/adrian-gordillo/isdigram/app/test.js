import logic from "../../logic.mjs";
import Component from "../../core/Component.mjs";
import Image from "../../core/Image.mjs";
import db from "../../data/data.mjs";

class Chat extends Component {
  constructor() {
    super("section");

    this.addClass("chat-section");

    const userList = new Component("div");
    userList.addClass("user-list");

    const chatPanel = new Component("div");
    chatPanel.addClass("chat-panel");

    const chatPanelUsername = new Component("h3");
    chatPanelUsername.addClass("chat-panel__username");

    const messsageList = new Component("ul");
    messsageList.addClass("message-list");

    this._userList = userList;
    this._chatPanel = chatPanel;
    this._chatPanelUsername = chatPanelUsername;
    this._messageList = messsageList;

    chatPanel.add(chatPanelUsername, messsageList);
    this.add(userList, chatPanel);
    try {
      const users = logic.retrieveUsersWithStatus();

      users.forEach(function (user) {
        const item = new Component("li");

        item.addClass("user-list__item");

        if (user.status === "online") item.addClass("user-list__item--online");
        else if (user.status === "offline")
          item.addClass("user-list__item--offline");

        const avatarImg = new Image();
        avatarImg.setSource(user.avatar);
        avatarImg.setAlt(user.username);

        const avatarText = new Component("p");
        avatarText.setText(user.username);

        item.add(avatarImg, avatarText);

        userList.add(item);
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
}

export default Chat;
