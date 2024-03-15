import utils from "../../utils.mjs";

import logic from "../../logic.mjs";

import Image from "../../core/Image.mjs";
import Component from "../../core/Component.mjs";

class Post extends Component {
  constructor(post) {
    super("article");

    // this.addClass("post");

    const divPostButtons = new Component("div");
    divPostButtons.addClass("divPostButtons");

    const likeButton = new Component("button");
    likeButton.addClass("btn-like");

    const commentButton = new Component("button");
    commentButton.addClass("btn-comment");

    const shareButton = new Component("button");
    shareButton.addClass("btn-share");

    divPostButtons.add(likeButton, commentButton, shareButton);

    var author = new Component("h3");
    author.setText(post.author.username);

    var picture = new Image();
    picture.setSource(post.image);
    picture.addClass("imgPost");

    var paragraph = new Component("p");
    paragraph.setText(post.text);

    var dateTime = new Component("time");
    dateTime.setText(post.date);

    /* var deleteButton = new Component("button");
  deleteButton.setText("🗑️");

  var editButton = new Component("button");
  editButton.setText("📝");

  this.add(
    author,
    editButton,
    deleteButton,
    picture,
    divPostButtons,
    paragraph,
    dateTime
  );*/

    if (post.author.id === logic.getLoggedInUserId()) {
      const deleteButton = new Component("button");
      deleteButton.setText("🗑️");

      deleteButton.onClick(function () {
        if (confirm("delete post?"))
          try {
            logic.removePost(post.id);

            // TODO renderPosts() ?
          } catch (error) {
            utils.showFeedback(error);
          }
      });

      const editButton = new Component("button");
      editButton.setText("📝");

      editButton.onClick(() => {
        // TODO open edit panel
      });

      this.add(deleteButton, editButton);
    }

    this.add(
      author,
      // editButton,
      // deleteButton,
      picture,
      divPostButtons,
      paragraph,
      dateTime
    );
  }
}

export default Post;
