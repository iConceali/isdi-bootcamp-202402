item.onClick = function () {
  this._chatPanelUsername.setText(user.username);

  function renderMessages() {
    try {
      // const messageList = chatPanel.querySelector(".message-list");
      const isScrolledToBottom =
        this._messageList.scrollHeight - this._messageList.clientHeight <=
        this._messageList.scrollTop + 1;

      const messages = logic.retrieveMessagesWithUser(user.id);

      this._messageList.innerHTML = "";

      messages.forEach(function (message) {
        const messageParagraph = new Component("p");

        messageParagraph.setText(message.text);

        if (message.from === logic.getLoggedInUserId())
          messageParagraph.addClass("message-list__item--right");
        else messageParagraph.addClass("message-list__item--left");

        this._messageList.add(messageParagraph);
      });

      if (isScrolledToBottom) {
        this._messageList.scrollTop = this._messageList.scrollHeight;
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
