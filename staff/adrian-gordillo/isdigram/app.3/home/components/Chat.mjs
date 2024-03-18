// Chat.js

import logic from "../../logic.mjs";
import Component from "../../core/Component.mjs";
import Image from "../../core/Image.mjs";
import Form from "../../core/Form.mjs";

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

    this._userList = userList;
    this._chatPanel = chatPanel;
    this._chatPanelUsername = chatPanelUsername;
    this._messageList = messageList;

    chatPanel.add(chatPanelUsername, messageList);
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

        item.onClick = () => {
          this._chatPanelUsername.setText(user.username);

          function renderMessages() {
            try {
              const messageList = chatPanel.querySelector(".message-list");
              const isScrolledToBottom =
                messageList.scrollHeight - messageList.clientHeight <=
                messageList.scrollTop + 1;

              const messages = logic.retrieveMessagesWithUser(user.id);

              messageList.innerHTML = "";

              messages.forEach(function (message) {
                const messageParagraph = new Component("p");

                messageParagraph.setText(message.text);

                if (message.from === logic.getLoggedInUserId())
                  messageParagraph.addClass("message-list__item--right");
                else messageParagraph.addClass("message-list__item--left");

                messageList.add(messageParagraph);
              });

              if (isScrolledToBottom) {
                messageList.scrollTop = messageList.scrollHeight;
              }
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          }

          renderMessages();

          clearInterval(renderMessagesIntervalId);

          renderMessagesIntervalId = setInterval(renderMessages, 1000);

          const formChat = new Form();
          formChat.setId("chat-form");

          formChat.onsubmit = function (event) {
            event.preventDefault();

            const textInput = new Input();
            textInput.setId("chat-input");
            textInput.setType("text");
            textInput.setPlaceholder("Text");

            const textValue = textInput.value;

            this._chatPanel.add(formChat);

            try {
              logic.sendMessageToUser(user.id, textValue);

              formChat.reset();

              renderMessages();
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          };

          chatPanel.style.display = "block";
        };
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
}

export default Chat;
