import { validate, errors } from "com";

function retrievePosts(callback) {
  validate.callback(callback);

  var xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status, responseText: json } = xhr;

    if (status == 200) {
      const posts = JSON.parse(json);

      callback(null, posts);

      return;
    }

    const { error, message } = JSON.parse(json);

    const constructor = errors[error];

    callback(new constructor(message));
  };

  xhr.open("GET", `http://localhost:8080/posts`);

  xhr.setRequestHeader("Authorization", sessionStorage.userId);

  xhr.send();
}

export default retrievePosts;
