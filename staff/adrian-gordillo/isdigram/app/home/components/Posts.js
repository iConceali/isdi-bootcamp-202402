function Posts() {
  Component.call(this, "section");

  var posts = logic.retrievePosts();

  posts.forEach(
    function (post) {
      var post2 = new Post(post);

      this.add(post2);
    }.bind(this)
  );
}

Posts.prototype = Object.create(Component.prototype);
Posts.prototype.constructor = Posts;
