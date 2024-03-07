(function () {
  if (!logic.isUserLoggedIn()) {
    location.href = "../login";

    return;
  }

  var title = document.querySelector("h1");
  var logoutButton = document.querySelector("#btn-logout");
  var createPostSection = document.querySelector("#create-post-section");
  var createPostForm = createPostSection.querySelector("form");
  var createPostCancelButton = document.querySelector("#btn-cancel-post");
  var createPostButton = document.querySelector("#btn-floating-form-post");
  var listSection = document.querySelector(".post-list");
  var btnChat = document.querySelector("#btn-chat");

  var chatBox = document.createElement("div");
  chatBox.className = "chat-box";

  function openChat() {
    try {
      listSection.innerHTML = "";

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

  try {
    var user = logic.retrieveUser();

    title.innerText = "Hello, " + user.name + "!";
  } catch (error) {
    console.error(error);

    alert(error.message);
  }

  btnChat.onclick = function () {
    logoutButton.style.display = "none";
    createPostButton.style.display = "none";
    title.innerText = "Chat";

    openChat();

    renderChatMessages();
  };

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
})();
