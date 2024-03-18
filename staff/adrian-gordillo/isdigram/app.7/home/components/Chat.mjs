import utils from "../../utils.mjs";
import logic from "../../logic.mjs";
import Component from "../../core/Component.mjs";
import Form from "../../core/Form.mjs";
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

    // Define messageList como propiedad de la clase Chat
    this.messageList = new Component();
    this.messageList.addClass("message-list");

    let clickedUser = null; // Guardar la referencia al usuario clickeado

    formChat.onSubmit((event) => {
      event.preventDefault();

      const text = textInput.getValue();

      try {
        if (clickedUser) {
          // Comprueba si se ha clickeado en algún usuario
          logic.sendMessageToUser(clickedUser.id, text); // Utiliza clickedUser en lugar de user
          this.renderMessages(clickedUser); // Llama a renderMessages con el usuario clickeado
        } else {
          throw new Error("No se ha seleccionado ningún usuario.");
        }

        formChat.reset();
      } catch (error) {
        utils.showFeedback(error);
      }
    });

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

        item.addClass("user-list__item");

        if (user.status === "online") item.addClass("user-list__item--online");
        else item.addClass("user-list__item--offline");

        const avatarImg = new Image();
        avatarImg.setSource(user.avatar);
        avatarImg.setAlt(user.username);

        const avatarText = new Component("p");
        avatarText.setText(user.username);

        item.add(avatarImg, avatarText);
        userList.add(item);

        item.onClick(() => {
          clickedUser = user; // Guarda la referencia al usuario clickeado
          if (chatPanel) this.remove(chatPanel);

          chatPanel = new Component();
          chatPanel.addClass("chat-panel");

          const chatPanelUsername = new Component("h3");
          chatPanelUsername.addClass("chat-panel__username");
          chatPanelUsername.setText(user.username);

          // Usa this.messageList en lugar de messageList
          this.renderMessages(user); // Pasa user como argumento

          chatPanel.add(chatPanelUsername, this.messageList);

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

  // Método renderMessages actualizado para usar this.messageList y user
  renderMessages(user) {
    this.messageList.removeAll();

    try {
      const messages = logic.retrieveMessagesWithUser(user.id);

      messages.forEach((message) => {
        const messageitem = new Component("p");
        messageitem.setText(message.text);

        if (message.from === logic.getLoggedInUserId())
          messageitem.addClass("message-list__item--right");
        else messageitem.addClass("message-list__item--left");

        this.messageList.add(messageitem);
      });
    } catch (error) {
      utils.showFeedback(error);
    }
  }
}

export default Chat;
