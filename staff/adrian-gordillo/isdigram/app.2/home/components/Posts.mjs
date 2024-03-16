import utils from "../../utils.mjs";

import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
import Post from "./Post.mjs";

class Posts extends Component {
  constructor() {
    super("section");

    this.refresh();
  }

  refresh() {
    try {
      const posts = logic.retrievePosts();

      this.removeAll();

      posts.forEach((post) => {
        const post2 = new Post(post);

        this.add(post2);
      });
    } catch (error) {
      utils.showFeedback(error);
    }
  }
}

export default Posts;
