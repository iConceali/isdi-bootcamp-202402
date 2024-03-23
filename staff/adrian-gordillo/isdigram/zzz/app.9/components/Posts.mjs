import utils from "../utils.mjs";

import logic from "../logic.mjs";

import Component from "./core/Component.mjs";
import Post from "./Post.mjs";

class Posts extends Component {
  constructor() {
    super("section");
    this.addClass("post-list-section");
    this.refresh();

    this._refreshIntervalId = setInterval(() => this.refresh(), 50);
  }

  refresh() {
    try {
      const posts = logic.retrievePosts();

      this.removeAll();

      posts.forEach((post) => {
        const post2 = new Post(post);

        post2.onDeleted(() => this.refresh());

        post2.onEdited(() => this.refresh());

        this.add(post2);
      });
    } catch (error) {
      utils.showFeedback(error);
    }
  }

  stopAutoRefresh() {
    clearInterval(this._refreshIntervalId);
  }
}

export default Posts;
