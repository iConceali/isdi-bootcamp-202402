//home.js
(function () {
  if (!logic.isUserLoggedIn()) {
    location.href = "../login";

    return;
  }

  var body = document.querySelector("body");
  var main = document.querySelector(".main-home");
  var title = document.querySelector("h1");
  var logoutButton = document.querySelector("#btn-logout");
  var createPostSection = document.querySelector("#create-post-section");
  var createPostForm = createPostSection.querySelector("form");
  var createPostCancelButton = document.querySelector("#btn-cancel-post");

  var btnHome = document.querySelector("#btn-home img");
  btnHome.src = "../images/icon-home-on.png";
  var btnSearch = document.querySelector("#btn-search img");
  btnSearch.src = "../images/icon-search-off.png";
  var btnPost = document.querySelector("#btn-post img");
  btnPost.src = "../images/icon-post-off.png";
  var btnReels = document.querySelector("#btn-reels img");
  btnReels.src = "../images/icon-reels-off.png";
  var btnProfile = document.querySelector("#btn-profile img");
  btnProfile.src = "../images/icon-profile-off.png";
  var listSection = document.querySelector(".users-frame");
  var btnChat = document.querySelector("#btn-chat");
  var avatar = document.querySelector("#user-avatar");

  var userList = document.createElement("div");
  userList.className = "user-list";

  var chatBox = document.createElement("div");
  chatBox.className = "chat-box";

  //TODO START CHAT ---------------------------------------
  // Modificación de la función openChat en home.js

  function openChat(userId) {
    try {
      listSection.innerHTML = "";

      listSection.appendChild(userList);
      listSection.appendChild(chatBox);

      var chatForm = document.createElement("form");
      chatForm.className = "chat-form";

      var chatInput = document.createElement("input");
      chatInput.className = "chat-input";

      var chatSendButton = document.createElement("button");
      chatSendButton.className = "btn-send-chat";

      chatInput.type = "text";
      chatInput.placeholder = "Type your message";
      chatSendButton.type = "submit";
      chatSendButton.innerText = "Send";

      chatForm.append(chatInput, chatSendButton);

      listSection.appendChild(chatForm);

      chatSendButton.addEventListener("click", function (event) {
        event.preventDefault();

        var text = chatInput.value.trim();

        if (text !== "") {
          logic.sendMessageToUser(userId, text);
          logic.displayChatMessage(logic.retrieveUser().username, text);
          chatInput.value = "";
        }
      });

      // Limpiar chatBox antes de cargar nuevos mensajes
      chatBox.innerHTML = "";

      var messages = logic.retrieveMessagesWithUser(userId);

      messages.forEach(function (message) {
        var sender =
          message.from === userId
            ? logic.retrieveUser().username
            : logic.retrieveUser(userId).username;
        logic.displayChatMessage(sender, message.text);
      });

      userList.innerHTML = "";

      var users = logic.retrieveUsers();

      users.forEach(function (user) {
        var item = document.createElement("div");

        if (user.status === "online")
          item.classList.add("user-list__item--online");
        else if (user.status === "offline")
          item.classList.add("user-list__item--offline");

        var avatarImg = document.createElement("img");
        avatarImg.src = user.avatar || "../images/avatar-empty.webp";
        avatarImg.alt = user.username;

        var avatarText = document.createElement("p");
        avatarText.innerText = user.username;

        item.addEventListener("click", function () {
          openChat(user.id);
        });

        item.append(avatarImg, avatarText);

        userList.appendChild(item);
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  //TODO --------------------------------------------------

  try {
    var user = logic.retrieveUser();

    title.innerText = "Hello, " + user.name + "!";
    avatar.src = user.avatar || "../images/avatar-empty.webp";
  } catch (error) {
    console.error(error);

    alert(error.message);
  }

  //todo cambiar avatar ----------------------------------

  avatar.addEventListener("click", function () {
    var avatarInput = document.createElement("input");
    avatarInput.type = "file";
    avatarInput.accept = "image/*";

    avatarInput.addEventListener("change", function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onloadend = function () {
        var user = logic.retrieveUser();
        user.avatar = reader.result;
        data.users.updateOne(user);
        avatar.src = user.avatar;
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      avatarInput.remove();
    });

    avatarInput.click();
  });

  //todo fin avatar---------------------------------------

  createPostCancelButton.onclick = function () {
    createPostSection.style.display = "none";

    btnHome.src = "../images/icon-home-on.png";
    btnPost.src = "../images/icon-post-off.png";
    btnSearch.src = "../images/icon-search-off.png";
    btnReels.src = "../images/icon-reels-off.png";
    btnProfile.src = "../images/icon-profile-off.png";
  };

  btnHome.onclick = function () {
    listSection.innerHTML = "";

    btnChat.style.display = "";
    btnPost.style.display = "";
    title.style.display = "";
    body.style.overflow = "";
    main.style.overflow = "";

    btnHome.src = "../images/icon-home-on.png";

    btnPost.src = "../images/icon-post-off.png";
    btnSearch.src = "../images/icon-search-off.png";
    btnReels.src = "../images/icon-reels-off.png";
    btnProfile.src = "../images/icon-profile-off.png";

    renderPosts();
  };

  btnPost.onclick = function () {
    createPostSection.style.display = "block";

    btnPost.src = "../images/icon-post-on.png";

    btnHome.src = "../images/icon-home-off.png";
    btnSearch.src = "../images/icon-search-off.png";
    btnReels.src = "../images/icon-reels-off.png";
    btnProfile.src = "../images/icon-profile-off.png";
  };

  logoutButton.onclick = function () {
    logic.logoutUser();

    location.href = "../login";
  };

  createPostForm.onsubmit = function (event) {
    event.preventDefault();

    var image = document.getElementById("image").value;
    var text = document.getElementById("text").value;

    try {
      logic.createPost(image, text);

      createPostForm.reset();

      createPostSection.style.display = "none";

      renderPosts();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  function renderPosts() {
    try {
      var posts = logic.retrievePosts();

      listSection.innerHTML = "";

      posts.forEach(function (post) {
        var article = document.createElement("article");
        article.className = "post";

        var authorHeading = document.createElement("h3");
        authorHeading.innerText = post.author.username;

        var deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete-post";
        deleteButton.style.display = "none";

        if (post.author.id === logic.getLoggedInUserId()) {
          deleteButton.style.display = "";
          deleteButton.onclick = function () {
            if (confirm("delete post?"))
              try {
                logic.removePost(post.id);
                renderPosts();
              } catch (error) {
                console.error(error);
                alert(error.message);
              }
          };

          article.appendChild(deleteButton);
        }

        var image = document.createElement("img");
        image.src = post.image;
        image.className = "imgPost";

        var paragraph = document.createElement("p");
        paragraph.innerText = post.text;
        paragraph.className = "post-text";

        var dateTime = document.createElement("time");
        dateTime.innerText = post.date;
        dateTime.className = "date";

        var divPostButtons = document.createElement("div");
        divPostButtons.className = "divPostButtons";

        var btnLike = document.createElement("button");
        btnLike.style.backgroundImage = 'url("../images/icon-heart.png")';
        btnLike.className = "btn-like";

        var btnComment = document.createElement("button");
        btnComment.style.backgroundImage = 'url("../images/icon-comment.png")';
        btnComment.className = "btn-comment";

        var btnShare = document.createElement("button");
        btnShare.style.backgroundImage = 'url("../images/icon-share.png")';
        btnShare.className = "btn-share";

        var divPost = document.createElement("div");
        divPost.className = "divPost";

        article.append(
          authorHeading,
          deleteButton,
          image,
          divPostButtons,
          divPost
        );
        divPostButtons.append(btnLike, btnComment, btnShare);
        divPost.append(paragraph, dateTime);

        listSection.appendChild(article);

        divPost.addEventListener("click", function () {
          if (post.author.id === logic.getLoggedInUserId()) {
            var newText = prompt("Enter the new text:", post.text);

            if (newText !== null) {
              try {
                logic.changePost(post.id, newText);
                renderPosts();
              } catch (error) {
                console.error(error);
                alert(error.message);
              }
            }
          }
        });
      });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  renderPosts();

  //todo boton chat ---------------------------------------
  btnChat.onclick = function () {
    btnChat.style.display = "none";
    title.style.display = "none";
    body.style.overflow = "hidden";
    main.style.overflow = "hidden";

    btnHome.src = "../images/icon-home-off.png";
    btnPost.src = "../images/icon-post-off.png";
    btnSearch.src = "../images/icon-search-off.png";
    btnReels.src = "../images/icon-reels-off.png";
    btnProfile.src = "../images/icon-profile-off.png";

    openChat(user.id);
  };

  // homeButton.onclick = function () {
  //   homeButton.style.display = "none";
  //   chatSection.style.display = "none";

  //   postListSection.style.display = "";
  //   footer.style.display = "";
  //   btnChat.style.display = "";
  // };

  //TODO --------------------------------------------------
})();
