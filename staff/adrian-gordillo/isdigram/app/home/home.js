//home.js
(function () {
  if (!logic.isUserLoggedIn()) {
    location.href = "../login";

    return;
  }

  var body = document.querySelector("body");
  var title = document.querySelector("h1");
  var logoutButton = document.querySelector("#btn-logout");
  var createPostSection = document.querySelector("#create-post-section");
  var createPostForm = createPostSection.querySelector("form");
  var createPostCancelButton = document.querySelector("#btn-cancel-post");
  var createPostButton = document.querySelector("#btn-floating-form-post");
  var listSection = document.querySelector(".post-list");
  var btnChat = document.querySelector("#btn-chat");
  var avatar = document.querySelector("#user-avatar");

  var userList = document.createElement("ul");
  userList.className = "user-list";

  var chatBox = document.createElement("div");
  chatBox.className = "chat-box";

  //TODO INICIO CHAT ---------------------------------------
  function openChat() {
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

      //todo userList--------------------

      userList.innerHTML = "";

      try {
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

          item.appendChild(avatarImg);

          userList.appendChild(item);
        });
      } catch (error) {
        console.error(error);

        alert(error.message);
      }

      //todo acaba---------------------

      chatForm.onsubmit = function (event) {
        event.preventDefault();
        var message = chatInput.value;

        sendChatMessage(message);

        chatInput.value = "";
      };

      renderChatMessages();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  function renderChatMessages() {
    var messages = [
      { sender: "User1", text: "Hello, how are you?" },
      { sender: "User2", text: "Hi! I'm doing well, thanks!" },
      { sender: "User1", text: "That's great to hear!" },
    ];

    messages.forEach(function (message) {
      displayChatMessage(message.sender, message.text);
    });
  }

  function sendChatMessage(message) {
    var sender = "CurrentUser";

    displayChatMessage(sender, message);
  }

  function displayChatMessage(sender, text) {
    var messageDiv = document.createElement("div");
    messageDiv.className = "chat-message";

    var senderSpan = document.createElement("span");
    senderSpan.innerText = sender + ": ";

    var textSpan = document.createElement("span");
    textSpan.innerText = text;

    messageDiv.append(senderSpan, textSpan);
    chatBox.appendChild(messageDiv);
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
        data.updateUser(user);
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
  };

  createPostButton.onclick = function () {
    createPostSection.style.display = "block";
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
          deleteButton.style.display = "block";
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

        var dateTime = document.createElement("time");
        dateTime.innerText = post.date;
        dateTime.className = "date";

        var divPost = document.createElement("div");
        divPost.className = "divPost";

        article.append(authorHeading, deleteButton, image, divPost);
        divPost.append(paragraph, dateTime);

        listSection.appendChild(article);
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
    createPostButton.style.display = "none";
    title.style.display = "none";
    body.style.overflow = "hidden";

    openChat();

    renderChatMessages();
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
