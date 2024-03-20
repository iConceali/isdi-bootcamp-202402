import utils from "../utils.mjs";

import logic from "../logic.mjs";

import Component from "../components/core/Component.mjs";
import Header from "../components/Header.mjs";
import Posts from "../components/Posts.mjs";
import Footer from "../components/Footer.mjs";
import CreatePost from "../components/CreatePost.mjs";
import Chat from "../components/Chat.mjs";

class Home extends Component {
  constructor() {
    super("main");

    this.addClass("main");

    // if (!logic.isUserLoggedIn()) location.href = "../login";
    // else {
    //   const header = new Header();

    //   header.assembleTo(document.body);

    //   const home = new Component("main");

    //   home.addClass("main");

    //   home.assembleTo(document.body);

    try {
      const user = logic.retrieveUser();

      const title = new Component("h1");
      title.setText("Hello, " + user.name + "!");

      this.add(title);
    } catch (error) {
      utils.showFeedback(error);
    }

    const header = new Header();

    const chat = new Chat();

    header.onChatClick(() => {
      posts.stopAutoRefresh();

      this.remove(posts);
      this.remove(footer);

      this.add(chat);
    });

    header.onHomeClick(() => {
      chat.stopAutoRefresh();

      this.remove(chat);

      this.add(posts);
      this.add(footer);
    });

    header.onLogoutClick(() => {
      posts.stopAutoRefresh();
      chat.stopAutoRefresh();

      this._onLogoutCallback();
    });

    this.add(header);

    const posts = new Posts();

    this.add(posts);

    const footer = new Footer();

    footer.onCreatePostClick(() => {
      if (!CreatePost.active) {
        const createPost = new CreatePost();

        createPost.onCancelClick(() => this.remove(createPost));

        createPost.onPostCreated(() => {
          this.remove(createPost);

          posts.refresh();
        });

        this.add(createPost);
      }
    });

    this.add(footer);

    this._onLogoutCallback = null;
  }

  onLogout(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onLogoutCallback = callback;
  }
}

export default Home;
