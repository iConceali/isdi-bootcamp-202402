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

    this._userList = userList;

    // formChat.add(chatInput, sendButton);
    // chatPanel.add(chatPanelUsername, messageList, formChat);
    // this.add(userList, chatPanel);

    try {
      const users = logic.retrieveUsersWithStatus();

      let chatPanel = null;

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

        item.onClick = () => {
          if (chatPanel) this.remove(chatPanel);

          const chatPanel = new Component("div");
          chatPanel.addClass("chat-panel");

          const chatPanelUsername = new Component("h3");
          chatPanelUsername.addClass("chat-panel__username");
          chatPanelUsername.setText(user.username);

          const messageList = new Component("div");
          messageList.addClass("message-list");

          function renderMessages() {
            messageList.removeAll();

            try {
              const messages = logic.retrieveMessagesWithUser(user.id);

              messages.forEach((message) => {
                const messageItem = new Component("p");
                messageItem.setText(message.text);

                if (message.from === logic.getLoggedInUserId())
                  messageItem.addClass("message-list__item--right");
                else messageItem.addClass("message-list__item--left");

                messageList.add(messageItem);
              });
            } catch (error) {
              utils.showFeedback(error);
            }
          }

          renderMessages.call(this);

          chatPanel.add(chatPanelUsername, messageList);

          this.add(chatPanel);

          const formChat = new Form();

          formChat.setId("chat-form");

          formChat.onSubmit((event) => {
            event.preventDefault();

            const text = textInput.getValue();

            try {
              logic.sendMessageToUser(user.id, text);

              formChat.reset();

              renderMessages.call(this);
            } catch (error) {
              utils.showFeedback(error);
            }
          });

          const chatInput = new Input();
          chatInput.setId("chat-input");
          chatInput.setType("text");
          chatInput.setPlaceholder("Text");

          const sendButton = new Button();
          sendButton.addClass("send-chat-button");
          sendButton.setType("submit");

          formChat.add(chatInput, sendButton);

          chatPanel.add(formChat);
        };

        userList.add(item);
      });
    } catch (error) {
      utils.showFeedback(error);
    }

    this.add(userList);
  }
}

export default Chat;
