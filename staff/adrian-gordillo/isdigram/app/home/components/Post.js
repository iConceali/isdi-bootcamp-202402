function Post(post) {
  Component.call(this, "article");

  // this.setClass("post");

  var divPostButtons = new Component("div");
  divPostButtons.setClass("divPostButtons");

  var likeButton = new Component("button");
  likeButton.setClass("btn-like");

  var commentButton = new Component("button");
  commentButton.setClass("btn-comment");

  var shareButton = new Component("button");
  shareButton.setClass("btn-share");

  divPostButtons.add(likeButton, commentButton, shareButton);

  var author = new Component("h3");
  author.setText(post.author.username);

  var picture = new Image();
  picture.setSource(post.image);
  picture.setClass("imgPost");

  var paragraph = new Component("p");
  paragraph.setText(post.text);

  var dateTime = new Component("time");
  dateTime.setText(post.date);

  // var deleteButton = new Component("button");
  // deleteButton.setText("🗑️");

  // var editButton = new Component("button");
  // editButton.setText("📝");

  // this.add(
  //   author,
  //   editButton,
  //   deleteButton,
  //   picture,
  //   divPostButtons,
  //   paragraph,
  //   dateTime
  // );

  if (post.author.id === logic.getLoggedInUserId()) {
    var deleteButton = new Component("button");
    deleteButton.setText("🗑️");

    deleteButton.onClick(function () {
      if (confirm("delete post?"))
        try {
          logic.removePost(post.id);

          // TODO renderPosts() ?
        } catch (error) {
          console.error(error);

          alert(error.message);
        }
    });

    var editButton = new Component("button");
    editButton.setText("📝");

    editButton.onClick(function () {
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

Post.prototype = Object.create(Component.prototype);
Post.prototype.constructor = Post;
