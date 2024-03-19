//logic.js

import db from "./data/data.mjs";

// constants

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
const URL_REGEX = /^(http|https):\/\//;

// helpers

function validateText(text, explain, checkEmptySpaceInside) {
  if (typeof text !== "string")
    throw new TypeError(explain + " " + text + " is not a string");
  if (!text.trim().length)
    throw new Error(explain + " >" + text + "< is empty or blank");

  if (checkEmptySpaceInside)
    if (text.includes(" "))
      throw new Error(explain + " " + text + " has empty spaces");
}

function validateDate(date, explain) {
  if (typeof date !== "string")
    throw new TypeError(explain + " " + date + " is not a string");
  if (!DATE_REGEX.test(date))
    throw new Error(explain + " " + date + " does not have a valid format");
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
  validateText(name, "name");
  validateDate(birthdate, "birthdate");
  validateEmail(email, "email");
  validateText(username, "username", true);
  validatePassword(password, "password");

  // TODO input validation

  let user = db.users.findOne(
    (user) => user.email === email || user.username === username
  );

  if (user) throw new Error("user already exists");

  user = {
    name: name.trim(),
    birthdate: birthdate,
    email: email,
    username: username,
    password: password,
    status: "offline",
  };

  db.users.insertOne(user);
}

function loginUser(username, password) {
  validateText(username, "username", true);
  validatePassword(password, "password");

  const user = db.users.findOne((user) => user.username === username);

  if (!user) throw new Error("user not found");

  if (user.password !== password) throw new Error("wrong password");

  user.status = "online";

  db.users.updateOne(user);

  sessionStorage.userId = user.id;
}

function retrieveUser() {
  const user = db.users.findOne((user) => user.id === sessionStorage.userId);

  if (!user) throw new Error("user not found");

  return user;
}

function logoutUser() {
  const user = db.users.findOne((user) => user.id === sessionStorage.userId);

  if (!user) throw new Error("user not found");

  user.status = "offline";

  db.users.updateOne(user);

  delete sessionStorage.userId;
}

function getLoggedInUserId() {
  return sessionStorage.userId;
}

function isUserLoggedIn() {
  return !!sessionStorage.userId;
}

function cleanUpLoggedInUserId() {
  delete sessionStorage.userId;
}

function retrieveUsersWithStatus() {
  const users = db.users.getAll();

  const index = users.findIndex((user) => user.id === sessionStorage.userId);

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

function sendMessageToUser(userId, text) {
  validateText(userId, "userId", true);
  validateText(text, "text");

  // { id, users: [id, id], messages: [{ from: id, text, date }, { from: id, text, date }, ...] }

  // find chat in chats (by user ids)
  // if no chat yet, then create it
  // add message in chat
  // update or insert chat in chats
  // save chats

  let chat = db.chats.findOne(
    (chat) =>
      chat.users.includes(userId) && chat.users.includes(sessionStorage.userId)
  );

  if (!chat) chat = { users: [userId, sessionStorage.userId], messages: [] };

  const message = {
    from: sessionStorage.userId,
    text: text,
    date: new Date().toISOString(),
  };

  chat.messages.push(message);

  if (!chat.id) db.chats.insertOne(chat);
  else db.chats.updateOne(chat);
}

function retrieveMessagesWithUser(userId) {
  validateText(userId, "userId", true);

  const chat = db.chats.findOne(
    (chat) =>
      chat.users.includes(userId) && chat.users.includes(sessionStorage.userId)
  );

  if (chat) return chat.messages;

  return [];
}

function createPost(image, text) {
  validateUrl(image, "image");

  if (text) validateText(text, "text");

  const post = {
    author: sessionStorage.userId,
    image: image,
    text: text,
    date: new Date().toLocaleDateString("en-CA"),
    likes: [],
  };

  db.posts.insertOne(post);
}

function likePost(postId) {
  validateText(postId, "postId", true);

  const post = db.posts.findOne((post) => post.id === postId);

  if (!post) throw new Error("post not found");

  const userId = sessionStorage.userId;

  if (post.likes.includes(userId)) {
    // Si el usuario ya ha dado like, lo eliminamos
    post.likes = post.likes.filter((id) => id !== userId);
  } else {
    // Si el usuario no ha dado like, lo añadimos
    post.likes.push(userId);
  }

  db.posts.updateOne(post);
}

function retrievePosts() {
  const posts = db.posts.getAll();

  posts.forEach(function (post) {
    const user = db.users.findOne((user) => user.id === post.author);

    post.author = { id: user.id, username: user.username };
  });

  return posts.reverse();
}

function removePost(postId) {
  validateText(postId, "postId", true);

  const post = db.posts.findOne((post) => post.id === postId);

  if (!post) throw new Error("post not found");

  if (post.author !== sessionStorage.userId)
    throw new Error("post does not belong to user");

  db.posts.deleteOne((post) => post.id === postId);
}

function modifyPost(postId, text) {
  validateText(postId, "postId", true);
  validateText(text, "text");

  const post = db.posts.findOne((post) => post.id === postId);

  if (!post) throw new Error("post not found");

  if (post.author !== sessionStorage.userId)
    throw new Error("post does not belong to user");

  post.text = text;

  db.posts.updateOne(post);
}

function updateUserAvatar(avatarUrl) {
  validateUrl(avatarUrl, "avatarUrl");

  var userId = sessionStorage.userId;

  var user = db.users.findOne(function (user) {
    return user.id === userId;
  });

  if (!user) throw new Error("user not found");

  user.avatar = avatarUrl;

  db.users.updateOne(user);
}

const logic = {
  registerUser,
  loginUser,
  retrieveUser,
  logoutUser,
  getLoggedInUserId,
  isUserLoggedIn,
  cleanUpLoggedInUserId,
  updateUserAvatar,

  retrieveUsersWithStatus,
  sendMessageToUser,
  retrieveMessagesWithUser,

  createPost,
  retrievePosts,
  removePost,
  modifyPost,
  likePost,
};

export default logic;
