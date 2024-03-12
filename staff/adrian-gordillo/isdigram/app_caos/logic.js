//logic.js
var logic = (function () {
  // constants

  var DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
  var EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
  var URL_REGEX = /^(http|https):\/\//;

  // helpers

  function validateText(text, explain, checkEmptySpaceInside) {
    if (typeof text !== "string")
      throw new Error(explain + " " + text + " is not a string");
    if (!text.trim().length)
      throw new Error(explain + " >" + text + "< is empty or blank");

    if (checkEmptySpaceInside)
      if (text.includes(" "))
        throw new Error(explain + " " + text + " has empty spaces");
  }

  function validateDate(date, explain) {
    if (!DATE_REGEX.test(date))
      throw new Error(explain + " " + date + " is not a date");
  }

  function validateEmail(email, explain) {
    if (!EMAIL_REGEX.test(email))
      throw new Error(explain + " " + email + " is not an email");
  }

  function validatePassword(password, explain) {
    if (!PASSWORD_REGEX.test(password))
      throw new Error(explain + " " + password + " is not acceptable");
  }

  function validateUrl(url, explain) {
    if (!URL_REGEX.test(url))
      throw new Error(explain + " " + url + " is not an url");
  }

  // logic

  function registerUser(name, birthdate, email, username, password) {
    // TODO input validation

    validateText(name, "name");
    validateDate(birthdate, "birthdate");
    validateEmail(email, "email");
    validateText(username, "username", true);
    validatePassword(password, "password");

    var user = data.users.findOne(function (user) {
      return user.email === email || user.username === username;
    });

    if (user) throw new Error("user already exists");

    var user = {
      name: name.trim(),
      birthdate: birthdate,
      email: email,
      username: username,
      password: password,
      status: "offline",
      avatar: "",
    };

    data.insertUser(user);
  }

  function loginUser(username, password) {
    // TODO input validation

    validateText(username, "username", true);
    validatePassword(password, "password");

    var user = data.users.findOne(function (user) {
      return user.username === username && user.password === password;
    });

    if (!user) throw new Error("wrong credentials");

    user.status = "online";

    data.users.updateOne(user);

    sessionStorage.userId = user.id;
  }

  function retrieveUser() {
    var user = data.users.findOne(function (user) {
      return user.id === sessionStorage.userId;
    });

    if (!user) throw new Error("user not found");

    return user;
  }

  function logoutUser() {
    var user = data.users.findOne(function (user) {
      return user.id === sessionStorage.userId;
    });

    if (!user) throw new Error("wrong credentials");

    user.status = "offline";

    data.users.updateOne(user);

    delete sessionStorage.userId;
  }

  function getLoggedInUserId() {
    return sessionStorage.userId;
  }

  function isUserLoggedIn() {
    return !!sessionStorage.userId;
  }

  function retrieveUsers() {
    var users = data.users.getAll();

    var index = users.findIndex(function (user) {
      return user.id === sessionStorage.userId;
    });

    users.splice(index, 1);

    users.forEach(function (user) {
      delete user.name;
      delete user.email;
      delete user.password;
      delete user.birthdate;
    });

    users
      .sort(function (a, b) {
        return a.username < b.username ? -1 : 1;
      })
      .sort(function (a, b) {
        return a.status > b.status ? -1 : 1;
      });

    return users;
  }

  function createPost(image, text) {
    validateUrl(image, "image");

    if (text) validateText(text, "text");

    var post = {
      author: sessionStorage.userId,
      image: image,
      text: text,
      date: new Date().toLocaleDateString("en-CA"),
    };

    data.posts.insertOne(post);
  }

  function retrievePosts() {
    var posts = data.posts.getAll();

    posts.forEach(function (post) {
      var user = data.users.findOne(function (user) {
        return user.id === post.author;
      });

      post.author = { id: user.id, username: user.username };
    });

    return posts.reverse();
  }

  function changePost(postId, newText) {
    validateText(postId, "postId", true);

    try {
      var post = data.posts.findOne(function (post) {
        return post.id === postId;
      });

      if (!post) throw new Error("post not found");

      if (post.author !== getLoggedInUserId())
        throw new Error("post does not belong to user");

      data.posts.editPost(postId, newText);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function removePost(postId) {
    // TODO input validation---------------------------

    validateText(postId, "postId", true);

    var post = data.posts.findOne(function (post) {
      return post.id === postId;
    });

    if (!post) throw new Error("post not found");

    if (post.author !== sessionStorage.userId)
      throw new Error("post does not belong to user");

    data.posts.deleteOne(function (post) {
      return post.id === postId;
    });
  }

  //TODO chat logic-------------------------------------
  function sendMessageToUser(text) {
    validateText(text, "text");

    // { id, users: [id, id], messages: [{ from: id, text, date }, { from: id, text, date }, ...] }

    var chat = data.chats.findOne(function (chat) {
      return chat.users.includes(sessionStorage.userId);
    });

    if (!chat) chat = { users: [userId, sessionStorage.userId], messages: [] };

    var message = {
      from: sessionStorage.userId,
      text: text,
      date: new Date().toISOString(),
    };

    chat.messages.push(message);

    if (!chat.id) data.chats.insertOne(chat);
    else data.chats.updateOne(chat);
  }

  function retrieveMessagesWithUser(userId) {
    validateText(userId, "userId", true);

    var chat = data.chats.findOne(function (chat) {
      return chat.users.includes(sessionStorage.userId);
    });

    if (chat) return chat.messages;

    return [];
  }

  function retrieveUsersWithStatus() {
    var users = data.users.getAll();

    var index = users.findIndex(function (user) {
      return user.id === sessionStorage.userId;
    });

    users.splice(index, 1);

    users.forEach(function (user) {
      delete user.name;
      delete user.email;
      delete user.password;
      delete user.birthdate;
    });

    users
      .sort(function (a, b) {
        return a.username < b.username ? -1 : 1;
      })
      .sort(function (a, b) {
        return a.status > b.status ? -1 : 1;
      });

    return users;
  }

  //todo ----------------------------------------------

  return {
    registerUser: registerUser,
    loginUser: loginUser,
    retrieveUser: retrieveUser,
    logoutUser: logoutUser,
    getLoggedInUserId: getLoggedInUserId,
    isUserLoggedIn: isUserLoggedIn,
    retrieveUsers: retrieveUsers,
    retrieveUsersWithStatus: retrieveUsersWithStatus,
    createPost: createPost,
    retrievePosts: retrievePosts,
    removePost: removePost,
    changePost: changePost,
    sendMessageToUser: sendMessageToUser,
    retrieveMessagesWithUser: retrieveMessagesWithUser,
  };
})();
