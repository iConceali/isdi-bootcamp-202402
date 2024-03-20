import utils from "../utils.mjs";

import logic from "../logic.mjs";

import Image from "./core/Image.mjs";
import Component from "./core/Component.mjs";
import EditPost from "./EditPost.mjs";

class Post extends Component {
  constructor(post) {
    super("article");

    // this.addClass("post");

    const divPostButtons = new Component("div");
    divPostButtons.addClass("div-post-buttons");

    const likeButton = new Component("button");
    likeButton.addClass("btn-like-off");

    // Verificar si el usuario actual ha dado like al post
    if (post.likes.includes(logic.getLoggedInUserId())) {
      likeButton.addClass("btn-like-on");
    }

    const commentButton = new Component("button");
    commentButton.addClass("btn-comment");

    const shareButton = new Component("button");
    shareButton.addClass("btn-share");

    divPostButtons.add(likeButton, commentButton, shareButton);

    const author = new Component("h3");
    author.setText(post.author.username);

    const picture = new Image();
    picture.setSource(post.image);
    picture.addClass("img-post");

    const divPostText = new Component("div");
    divPostText.addClass("div-post-text");

    const paragraph = new Component("p");
    paragraph.setText(post.text);

    const dateTime = new Component("time");
    dateTime.setText(post.date);

    divPostText.add(paragraph, dateTime);
    this.add(author, picture, divPostButtons, divPostText);

    likeButton.onClick(() => {
      likeButton.removeClass("btn-like-off");
      likeButton.addClass("btn-like-on");

      logic.likePost(post.id);
    });

    if (post.author.id === logic.getLoggedInUserId()) {
      const deleteButton = new Component("button");
      deleteButton.setText("🗑️");
      deleteButton.addClass("btn-delete-post");

      deleteButton.onClick(() => {
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
      editButton.addClass("btn-edit-post");

      editButton.onClick(() => {
        if (!EditPost.active) {
          const editPost = new EditPost(post);

          // editPost.onCancelClick(() => this.remove(editPost));

          editPost.onPostEdited(() => this._onEditedCallback());

          this.add(editPost);
        }
      });

      divPostButtons.add(deleteButton, editButton);
    }

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
