import utils from "../utils.mjs";

import logic from "../logic.mjs";

import Component from "../core/Component.mjs";
import Header from "./components/header.mjs";
import Menu from "./components/Menu.mjs";
import Posts from "./components/Posts.mjs";
import Footer from "./components/Footer.mjs";
import CreatePost from "./components/CreatePost.mjs";
import Chat from "./components/Chat.mjs";

if (!logic.isUserLoggedIn()) location.href = "../login";
else {
  const header = new Header();

  header.assembleTo(document.body);

  const home = new Component("main");

  home.addClass("main");

  home.assembleTo(document.body);

  try {
    const user = logic.retrieveUser();

    const title = new Component("h1");
    title.setText("Hello, " + user.name + "!");

    home.add(title);
  } catch (error) {
    utils.showFeedback(error);
  }

  const menu = new Menu();

  const chat = new Chat();

  header.onChatClick(() => {
    home.remove(posts);
    home.remove(footer);

    home.add(chat);
  });

  // footer.onHomeClick(() => {
  //   home.remove(chat);

  //   home.add(posts);
  //   home.add(footer);
  // });

  home.add(menu);

  const posts = new Posts();

  home.add(posts);

  const footer = new Footer();

  footer.onHomeClick(() => {
    home.remove(chat);

    home.add(posts);
    home.add(footer);
  });

  footer.onCreatePostClick(() => {
    const createPost = new CreatePost();

    createPost.onCancelClick(() => home.remove(createPost));

    createPost.onPostCreated(() => {
      home.remove(createPost);

      posts.refresh();
    });

    home.add(createPost);
  });

  home.add(footer);
}

/*
(function () {
  if (!logic.isUserLoggedIn()) {
    location.href = "../login";

    return;
  }

  var body = document.querySelector("body");
  var title = document.querySelector("h1");
  var logoutButton = document.querySelector("#logout-button");
  var createPostSection = document.querySelector("#create-post-section");
  var createPostForm = createPostSection.querySelector("form");
  var createPostCancelButton = createPostSection.querySelector(
    "#create-post-cancel-button"
  );
  var avatarUser = document.querySelector("#user-avatar");

  var postListSection = document.querySelector("#post-list-section");
  var chatButton = document.querySelector("#chat-button");
  var chatSection = document.querySelector("#chat-section");
  chatSection.style.display = "none";
  var chatPanel = chatSection.querySelector("#chat-panel");
  var chatForm = chatPanel.querySelector("form");
  var footer = document.querySelector("footer");
  var homeButton = document.querySelector("#home-button");
  var editPostSection = document.querySelector("#edit-post-section");
  var editPostCancelButton = editPostSection.querySelector(
    "#edit-post-cancel-button"
  );
  var editPostForm = editPostSection.querySelector("form");

  var btnHome = document.querySelector("#home-button img");
  btnHome.src = "../images/icon-home-on.png";
  var btnSearch = document.querySelector("#search-button img");
  btnSearch.src = "../images/icon-search-off.png";
  var createPostButton = document.querySelector("#create-post-button img");
  createPostButton.src = "../images/icon-post-off.png";
  var btnReels = document.querySelector("#reels-button img");
  btnReels.src = "../images/icon-reels-off.png";
  var btnProfile = document.querySelector("#profile-button img");
  btnProfile.src = "../images/icon-profile-off.png";

  try {
    var user = logic.retrieveUser();

    title.innerText = "Hello, " + user.name + "!";
  } catch (error) {
    console.error(error);

    alert(error.message);

    try {
      logic.logoutUser();
    } catch (error) {
      logic.cleanUpLoggedInUserId();
    }

    location.href = "../login";
  }

  logoutButton.onclick = function () {
    logic.logoutUser();

    location.href = "../login";
  };

  createPostForm.onsubmit = function (event) {
    event.preventDefault();

    var imageInput = createPostForm.querySelector("#image");
    var image = imageInput.value;

    var textInput = createPostForm.querySelector("#text");
    var text = textInput.value;

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

  createPostButton.onclick = function () {
    createPostSection.style.display = "block";
  };

  createPostCancelButton.onclick = function () {
    createPostSection.style.display = "none";
  };

  function renderPosts() {
    try {
      var posts = logic.retrievePosts();

      postListSection.innerHTML = "";

      posts.forEach(function (post) {
        var article = document.createElement("article");

        var authorHeading = document.createElement("h3");
        authorHeading.innerText = post.author.username;

        var deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete-post";
        deleteButton.style.display = "none";

        var editButton = document.createElement("button");
        editButton.innerText = "📝";
        editButton.style.display = "none";

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

          editButton.style.display = "";
          editButton.onclick = function () {
            var textInput = editPostForm.querySelector("#text");

            textInput.value = post.text;

            editPostForm.onsubmit = function (event) {
              event.preventDefault();

              var text = textInput.value;

              try {
                logic.modifyPost(post.id, text);

                editPostForm.reset();

                editPostSection.style.display = "";

                renderPosts();
              } catch (error) {
                console.error(error);

                alert(error.message);
              }
            };

            editPostSection.style.display = "block";
          };
        }

        //--aqui edit button antes

        var image = document.createElement("img");
        image.src = post.image;
        image.className = "imgPost";

        var paragraph = document.createElement("p");
        paragraph.innerText = post.text;

        var dateTime = document.createElement("time");
        dateTime.innerText = post.date;

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

        // article.append(authorHeading, image, paragraph, dateTime);

        article.append(
          authorHeading,
          editButton,
          deleteButton,
          image,
          divPostButtons,
          divPost
        );
        divPostButtons.append(btnLike, btnComment, btnShare);
        divPost.append(paragraph, dateTime);

        postListSection.appendChild(article);

        if (post.author.id === logic.getLoggedInUserId()) {
          // var deleteButton = document.createElement("button");
          // deleteButton.innerText = "🗑️";
          // deleteButton.onclick = function () {
          //   if (confirm("delete post?"))
          //     try {
          //       logic.removePost(post.id);
          //       renderPosts();
          //     } catch (error) {
          //       console.error(error);
          //       alert(error.message);
          //     }
          // };
          // var editButton = document.createElement("button");
          // editButton.innerText = "📝";
          // editButton.onclick = function () {
          //   var textInput = editPostForm.querySelector("#text");
          //   textInput.value = post.text;
          //   editPostForm.onsubmit = function (event) {
          //     event.preventDefault();
          //     var text = textInput.value;
          //     try {
          //       logic.modifyPost(post.id, text);
          //       editPostForm.reset();
          //       editPostSection.style.display = "";
          //       renderPosts();
          //     } catch (error) {
          //       console.error(error);
          //       alert(error.message);
          //     }
          //   };
          //   editPostSection.style.display = "block";
          // };
          // article.append(editButton);
        }

        postListSection.appendChild(article);
      });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  renderPosts();

  var renderMessagesIntervalId;

  chatButton.onclick = function () {
    postListSection.style.display = "none";
    chatButton.style.display = "none";
    title.style.display = "none";
    body.style.overflow = "hidden";
    footer.style.display = "none";

    avatarUser.style.display = "none";

    homeButton.style.display = "block";
    chatSection.style.display = "block";

    var userList = chatSection.querySelector("#user-list");

    userList.innerHTML = "";

    try {
      var users = logic.retrieveUsersWithStatus();

      users.forEach(function (user) {
        var item = document.createElement("li");

        item.classList.add("user-list__item");

        if (user.status === "online")
          item.classList.add("user-list__item--online");
        else if (user.status === "offline")
          item.classList.add("user-list__item--offline");
        //todo añadido AVATAR--------------------------------------
        var avatarImg = document.createElement("img");
        avatarImg.src = user.avatar || "../images/avatar-empty.webp";
        avatarImg.alt = user.username;

        var avatarText = document.createElement("p");
        avatarText.innerText = user.username;
        //todo añadido AVATAR--------------------------------------

        item.append(avatarImg, avatarText);

        userList.appendChild(item);
        // item.innerText = user.username;

        item.onclick = function () {
          var usernameTitle = chatPanel.querySelector("#chat-panel__username");

          usernameTitle.innerText = user.username;

          function renderMessages() {
            try {
              var messageList = chatPanel.querySelector("#message-list");
              var isScrolledToBottom =
                messageList.scrollHeight - messageList.clientHeight <=
                messageList.scrollTop + 1;

              var messages = logic.retrieveMessagesWithUser(user.id);

              messageList.innerHTML = "";

              messages.forEach(function (message) {
                var messageParagraph = document.createElement("p");

                messageParagraph.innerText = message.text;

                if (message.from === logic.getLoggedInUserId())
                  messageParagraph.classList.add("message-list__item--right");
                else messageParagraph.classList.add("message-list__item--left");

                messageList.appendChild(messageParagraph);
              });

              if (isScrolledToBottom) {
                // Scroll hasta el final del elemento messageList
                messageList.scrollTop = messageList.scrollHeight;
              }
            } catch (error) {
              console.error(error);

              alert(error.message);
            }
          }

          renderMessages();

          clearInterval(renderMessagesIntervalId);

          renderMessagesIntervalId = setInterval(renderMessages, 1000);

          chatForm.onsubmit = function (event) {
            event.preventDefault();

            var textInput = chatForm.querySelector("#text");
            var text = textInput.value;

            try {
              logic.sendMessageToUser(user.id, text);

              chatForm.reset();

              renderMessages();
            } catch (error) {
              console.error(error);

              alert(error.message);
            }
          };

          chatPanel.style.display = "block";
        };

        userList.appendChild(item);
      });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  homeButton.onclick = function () {
    chatSection.style.display = "none";

    postListSection.style.display = "";
    chatButton.style.display = "";
    body.style.overflow = "";
  };

  editPostCancelButton.onclick = function () {
    editPostSection.style.display = "";
  };
})();
*/
