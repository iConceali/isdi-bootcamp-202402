import utils from "../../utils.mjs";

import logic from "../../logic.mjs";

import Component from "../../core/Component.mjs";
// import Label from "../../core/Label.mjs";
import Input from "../../core/Input.mjs";
import Button from "../../core/Button.mjs";
import Image from "../../core/Image.mjs";
import Form from "../../core/Form.mjs";

class CreatePost extends Component {
  constructor() {
    super("section");

    this.addClass("create-post-section");

    const title = new Component("h2");
    title.setText("Create Post");

    const form = new Form();

    const imageInput = new Input();
    imageInput.setId("image");
    imageInput.setType("text");
    imageInput.setPlaceholder("Image");

    const textInput = new Input();
    textInput.setId("text");
    textInput.setType("text");
    textInput.setPlaceholder("Text");

    const createButton = new Button();
    createButton.setType("submit");
    createButton.setText("Create");
    createButton.addClass("btn-general-post");

    form.add(title, imageInput, textInput, createButton);

    const cancelButton = new Button();
    cancelButton.addClass("btn-cancel-post");

    const imgCancelButton = new Image();
    imgCancelButton.addClass("img-cancel-post");
    imgCancelButton.setSource("../images/icon-cancel-post.png");

    this._cancelButton = cancelButton;

    cancelButton.add(imgCancelButton);

    this.add(form, cancelButton);

    form.onSubmit((event) => {
      event.preventDefault();

      const image = imageInput.getValue();
      const text = textInput.getValue();

      try {
        logic.createPost(image, text);

        this._onPostCreatedCallback();
      } catch (error) {
        utils.showFeedback(error);
      }
    });

    this._onPostCreatedCallback = null;

    CreatePost.active = true;
  }

  static active = false;

  onCancelClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._cancelButton.onClick(() => {
      CreatePost.active = false;

      callback();
    });
  }

  onPostCreated(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onPostCreatedCallback = () => {
      CreatePost.active = false;

      callback();
    };
  }
}

export default CreatePost;
