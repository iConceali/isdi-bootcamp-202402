import utils from "../../utils.mjs";

import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
import Label from "../../core/Label.mjs";
import Input from "../../core/Input.mjs";
import Button from "../../core/Button.mjs";
import Form from "../../core/Form.mjs";

class EditPost extends Component {
  constructor(post) {
    super("section");

    this.addClass("edit-post");

    // const title = new Component("h2");
    // title.setText("Edit Post");

    // const form = new Form();

    // const textLabel = new Label();
    // textLabel.setFor("text");
    // textLabel.setText("Text");

    // const textInput = new Input();
    // textInput.setId("text");
    // textInput.setType("text");
    // textInput.setValue(post.text);

    // const editButton = new Button();
    // editButton.setType("submit");
    // editButton.setText("Save");

    // form.add(editButton);
    // form.add(textLabel, textInput, editButton);

    // const cancelButton = new Button();
    // cancelButton.setText("Cancel");

    // this._cancelButton = cancelButton;

    // this.add(form, cancelButton);

    // form.onSubmit((event) => {
    //   event.preventDefault();

    try {
      const newText = prompt("Enter the new text for the post:", post.text);

      if (newText === null) {
        return;
      }

      logic.modifyPost(post.id, newText);

      // Llamar a la función de devolución de llamada para actualizar el post en Posts
      if (typeof updatePostCallback === "function") {
        updatePostCallback(post.id, newText);
      }
    } catch (error) {
      utils.showFeedback(error);
    }
  }

  static active = false;

  //   onCancelClick(callback) {
  //     if (typeof callback !== "function")
  //       throw new TypeError("callback is not a function");

  //     this._cancelButton.onClick(() => {
  //       EditPost.active = false;

  //       callback();
  //     });
  //   }

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
