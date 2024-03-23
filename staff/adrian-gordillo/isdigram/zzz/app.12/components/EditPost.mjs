import utils from "../utils.mjs";

import logic from "../logic.mjs";

import Component from "./core/Component.mjs";
import Label from "./core/Label.mjs";
import Input from "./core/Input.mjs";
import Button from "./core/Button.mjs";
import Form from "./core/Form.mjs";

class EditPost extends Component {
  constructor(post) {
    super("section");

    this.addClass("edit-post");

    try {
      const newText = prompt("Enter the new text for the post:", post.text);

      if (newText === null) {
        return;
      }

      logic.modifyPost(post.id, newText);

      if (typeof updatePostCallback === "function") {
        updatePostCallback(post.id, newText);
      }
    } catch (error) {
      utils.showFeedback(error);
    }
  }

  static active = false;

  onPostEdited(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onPostEditedCallback = () => {
      EditPost.active = false;

      callback();
    };
  }
}

export default EditPost;
