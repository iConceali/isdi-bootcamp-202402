// Chat.js

import utils from "../../utils.mjs";

import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
import Form from "../../core/Form.mjs";
// import Label from "../../core/Label.mjs";
import Input from "../../core/Input.mjs";
import Image from "../../core/Image.mjs";
import Button from "../../core/Button.mjs";

class Chat extends Component {
  constructor() {
    super("section");
    this.addClass("chat-section");

    const userList = new Component("ul");
    userList.addClass("user-list");

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

    // const textLabel = new Label();
    // textLabel.setText("Text");
    // textLabel.setFor("text");

    const textInput = new Input();
    textInput.setId("chat-input");

    const sendButton = new Button();
    sendButton.setType("submit");
    sendButton.addClass("send-chat-button");

    formChat.add(textInput, sendButton);

    try {
      const users = logic.retrieveUsersWithStatus();

      let chatPanel = null;

      users.forEach((user) => {
        const item = new Component("li");

        // item.setText(user.username);

        item.addClass("user-list__item");

        if (user.status === "online") item.addClass("user-list__item--online");
        else item.addClass("user-list__item--offline");
        //todo añadido AVATAR--------------------------------------
        const avatarImg = new Image();
        avatarImg.setSource(user.avatar);
        avatarImg.setAlt(user.username);

        const avatarText = new Component("p");
        avatarText.setText(user.username);

        item.add(avatarImg, avatarText);
        userList.add(item);
        //todo añadido AVATAR--------------------------------------

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

        item.onClick(() => {
          if (chatPanel) this.remove(chatPanel);

          chatPanel = new Component();
          chatPanel.addClass("chat-panel");

          const chatPanelUsername = new Component("h3");
          chatPanelUsername.addClass("chat-panel__username");
          chatPanelUsername.setText(user.username);

          const messageList = new Component();
          messageList.addClass("message-list");

          function renderMessages() {
            messageList.removeAll();

            try {
              const messages = logic.retrieveMessagesWithUser(user.id);

              messages.forEach((message) => {
                const messageitem = new Component("p");
                messageitem.setText(message.text);

                if (message.from === logic.getLoggedInUserId())
                  messageitem.addClass("message-list__item--right");
                else messageitem.addClass("message-list__item--left");

                messageList.add(messageitem);
              });
            } catch (error) {
              utils.showFeedback(error);
            }
          }

          renderMessages.call(this);

          chatPanel.add(chatPanelUsername, messageList);

          this._chatPanel = chatPanel;
          this.add(chatPanel);
        });

        userList.add(item);
      });
    } catch (error) {
      utils.showFeedback(error);
    }

    this.add(userList, formChat);
  }
}

export default Chat;
