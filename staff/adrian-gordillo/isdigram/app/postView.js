(function () {
  var postList = document.querySelector(".postList");

  var posts = data.findPosts();

  posts.forEach(function (post) {
    var postContainer = `
        <div class="post">
        <img class="imgPost" src="${post.image}" alt="Post Image">
        <p>${post.username}</p>  
        <p>${post.text}</p>
        <p>${post.date}</p>
        </div>`;

    postList.innerHTML += postContainer;
  });
})();
