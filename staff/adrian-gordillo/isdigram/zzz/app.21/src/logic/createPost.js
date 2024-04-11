import { validate, errors } from "com";

function createPost(image, text, callback) {
  validate.url(image, "image");
  if (text) validate.text(text, "text");
  validate.callback(callback);

  var xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status, responseText: json } = xhr;

    if (status >= 500) {
      callback(new Error("system error"));

      return;
    } else if (status >= 400) {
      // 400 - 499
      const { error, message } = JSON.parse(json);

      const constructor = window[error];

      callback(new constructor(message));
    } else if (status >= 300) {
      callback(new Error("system error"));

      return;
    } else {
      callback(null);
    }
  };

  xhr.open("POST", "http://localhost:8080/posts");

  xhr.setRequestHeader("Authorization", sessionStorage.userId);
  xhr.setRequestHeader("Content-Type", "application/json");

  const post = { image, text };

  const json = JSON.stringify(post);

  xhr.send(json);
}

export default createPost;
