import utils from "../../utils.mjs";

import logic from "../../logic.mjs";

import Image from "../../core/Image.mjs";
import Component from "../../core/Component.mjs";
import EditPost from "./EditPost.mjs";

class Post extends Component {
  constructor(post) {
    super("article");

    // this.addClass("post");

    const divPostButtons = new Component("div");
    divPostButtons.addClass("div-post-buttons");

    const likeButton = new Component("button");
    likeButton.addClass("btn-like");

    const commentButton = new Component("button");
    commentButton.addClass("btn-comment");

    const shareButton = new Component("button");
    shareButton.addClass("btn-share");

    divPostButtons.add(likeButton, commentButton, shareButton);

    const author = new Component("h3");
    author.setText(post.author.username);

    const picture = new Image();
    picture.setSource(post.image);
    picture.addClass("imgPost");

    const divPostText = new Component("div");
    divPostText.addClass("div-post-text");

    const paragraph = new Component("p");
    paragraph.setText(post.text);

    const dateTime = new Component("time");
    dateTime.setText(post.date);

    divPostText.add(paragraph, dateTime);

    if (post.author.id === logic.getLoggedInUserId()) {
      const deleteButton = new Component("button");
      deleteButton.setText("🗑️");

      deleteButton.onClick(function () {
        if (confirm("delete post?"))
          try {
            logic.removePost(post.id);

            this._onDeletedCallback();
          } catch (error) {
            utils.showFeedback(error);
          }
      });

      const editButton = new Component("button");
      editButton.setText("📝");

      editButton.onClick(() => {
        if (!EditPost.active) {
          const editPost = new EditPost(post);

          editPost.onCancelClick(() => this.remove(editPost));

          editPost.onPostEdited(() => this._onEditedCallback());

          this.add(editPost);
        }
      });

      this.add(deleteButton, editButton);
    }

    this.add(
      author,
      // editButton,
      // deleteButton,
      picture,
      divPostButtons,
      divPostText
    );
    this._onDeletedCallback = null;
    this._onEditedCallback = null;
  }

  onDeleted(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onDeletedCallback = callback;
  }

  onEdited(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onEditedCallback = callback;
  }
}

export default Post;
