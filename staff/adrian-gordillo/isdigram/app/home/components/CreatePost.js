function CreatePost() {
  Component.call(this, "section");

  var imageLabel = new Label();
  imageLabel.setFor("image");
  imageLabel.setText("Image");

  var imageInput = new Input();
  imageInput.setId("image");
  imageInput.setType("text");

  var textLabel = new Label();
  textLabel.setFor("text");
  textLabel.setText("Text");

  var textInput = new Input();
  textInput.setId("text");
  textInput.setType("text");

  var createButton = new Button();
  createButton.setType("submit");
  createButton.setText("Create");

  form.add(imageLabel, imageInput, textLabel, textInput, createButton);

  var cancelButton = new Button();
  cancelButton.onClick(function () {
    // TODO dismount create post
  });
}

CreatePost.prototype = Object.create(Component.prototype);
CreatePost.prototype.constructor = CreatePost;
