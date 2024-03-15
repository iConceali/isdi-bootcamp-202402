import Component from "../../core/Component.mjs";

class Chat extends Component {
  constructor() {
    super("section");

    const helloChat = new Component("h1");
    helloChat.setText("Hello, Chat!");
    this.add(helloChat);
  }
}

export default Chat;
