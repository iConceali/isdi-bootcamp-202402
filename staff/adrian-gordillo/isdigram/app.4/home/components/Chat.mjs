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

        const avatarImg = new Image();
        avatarImg.setSource(user.avatar);
        avatarImg.setAlt(user.username);

        const avatarText = new Component("p");
        avatarText.setText(user.username);

        item.add(avatarImg, avatarText);

        userList.add(item);

        item.onClick = () => {
          this._chatPanelUsername.setText(user.username);

          // Aquí se asigna la función renderMessages
          const renderMessages = () => {
            const self = this; // Guardar referencia al contexto de 'this'

            try {
              const isScrolledToBottom =
                self._messageList.scrollHeight -
                  self._messageList.clientHeight <=
                self._messageList.scrollTop + 1;

              const messages = logic.retrieveMessagesWithUser(user.id);

              self._messageList.clear(); // Limpiar la lista antes de agregar nuevos mensajes

              messages.forEach(function (message) {
                // Usar función regular para mantener el contexto de 'this'
                const messageParagraph = new Component("p");

                messageParagraph.setText(message.text);

                if (message.from === logic.getLoggedInUserId())
                  messageParagraph.addClass("message-list__item--right");
                else messageParagraph.addClass("message-list__item--left");

                self._messageList.add(messageParagraph); // Usar la referencia 'self'
              });

              if (isScrolledToBottom) {
                self._messageList.scrollTop = self._messageList.scrollHeight;
              }
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          }; // Aquí se cierra la definición de la función renderMessages

          renderMessages();

          clearInterval(renderMessagesIntervalId);

          renderMessagesIntervalId = setInterval(renderMessages, 1000);

          this._formChat.onsubmit = (event) => {
            event.preventDefault();

            const textValue = this._chatInput.value;

            try {
              logic.sendMessageToUser(user.id, textValue);

              this._formChat.reset();

              renderMessages();
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          };

          this._chatPanel.setStyle("display", "block"); // Mostrar el panel de chat
        };
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
}

export default Chat;
