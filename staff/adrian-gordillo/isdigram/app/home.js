(function () {
  var title = document.querySelector("h1");
  var logoutButton = document.querySelector("#btn-logout");
  var floatingButton = document.querySelector("#btn-floating-form-post");
  var createPostSection = document.querySelector("#create-post-section");
  var btnCancelPost = document.querySelector("#btn-cancel-post");

  try {
    var user = logic.retrieveUser();

    title.innerText = "Hello, " + user.name + "!";
  } catch (error) {
    alert(error.message);
  }

  btnCancelPost.onclick = function () {
    createPostSection.style.display = "none";
  };

  floatingButton.onclick = function () {
    createPostSection.style.display = "block";
  };

  logoutButton.onclick = function () {
    logic.logoutUser();

    location.href = "./login.html";
  };

  var form = document.querySelector("form");

  form.onsubmit = function (event) {
    event.preventDefault();

    var image = document.getElementById("image").value;
    var text = document.getElementById("text").value;

    try {
      logic.createPost(image, text);

      form.reset();

      createPostSection.style.display = "none";

      renderPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  function renderPosts() {
    try {
      var postList = document.querySelector(".postList");

      var posts = data.findPosts();

      postList.innerHTML = "";

      posts.forEach(function (post, index) {
        var postContainer = `
        <div class="post">
        <p>${post.author}</p>  
        <img class="imgPost" src="${post.image}" alt="Post Image">
        <div class="info-post-content">
            <p id="p-text">${post.text}</p>
            <p id="p-date">${post.date}</p>
          </div>
          <button class="btn-delete-post" data-index="${index}"></button>
          <p id="index-test">. ${index}</p>
        </div>`;

        postList.innerHTML += postContainer;
      });

      var deleteButtons = document.querySelectorAll(".btn-delete-post");
      deleteButtons.forEach(function (button) {
        button.onclick = function () {
          var index = parseInt(button.dataset.index);

          deletePost(index);
        };
      });
    } catch (error) {
      alert(error.message);
    }
  }

  function deletePost(index) {
    try {
      var posts = data.findPosts();

      posts.splice(index, 1);

      localStorage.posts = JSON.stringify(posts);

      renderPosts();
    } catch (error) {
      alert(error.message);
    }
  }

  renderPosts();
})();
