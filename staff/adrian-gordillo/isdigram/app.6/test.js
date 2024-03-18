// Chat.js

import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
import Image from "../../core/Image.mjs";
import Button from "../../core/Button.mjs";
import Form from "../../core/Form.mjs";
import Input from "../../core/Input.mjs";

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

    const messageList = new Component("ul");
    messageList.addClass("message-list");

    const formChat = new Form();
    formChat.setId("chat-form");

    const chatInput = new Input();
    chatInput.setId("chat-input");
    chatInput.setType("text");
    chatInput.setPlaceholder("Text");

    const sendButton = new Button();
    sendButton.addClass("send-chat-button");
    sendButton.setType("submit");

    this._userList = userList;
    this._chatPanel = chatPanel;
    this._chatPanelUsername = chatPanelUsername;
    this._messageList = messageList;
    this._formChat = formChat;
    this._chatInput = chatInput;
    this._sendButton = sendButton;

    formChat.add(chatInput, sendButton);
    chatPanel.add(chatPanelUsername, messageList, formChat);
    this.add(userList, chatPanel);

    try {
      const users = logic.retrieveUsersWithStatus();

      users.forEach((user) => {
        const item = new Component("li");

        item.addClass("user-list__item");

        if (user.status === "online") item.addClass("user-list__item--online");
        else if (user.status === "offline")
          item.addClass("user-list__item--offline");
        //todo añadido AVATAR--------------------------------------
        const avatarImg = new Image();
        avatarImg.setSource(user.avatar);
        avatarImg.setAlt(user.username);

        const avatarText = new Component("p");
        avatarText.setText(user.username);

        item.add(avatarImg, avatarText);
        userList.add(item);
        //todo añadido AVATAR--------------------------------------

        item.onClick;
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
}

export default Chat;
