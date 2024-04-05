import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { Component } from "react";

class CreatePost extends Component {
  constructor() {
    logger.debug("CreatePost");

    super();
  }

  componentDidMount() {
    logger.debug("CreatePost -> componentDidMount");
  }

  componentWillUnmount() {
    logger.debug("CreatePost -> componentWillUnmount");
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const image = form.image.value;
    const text = form.text.value;

    try {
      logic.createPost(image, text);

      form.reset();

      this.props.onPostCreated();
    } catch (error) {
      showFeedback(error);
    }
  };

  handleCancelClick = () => this.props.onCancelClick();

  render() {
    logger.debug("CreatePost -> render");

    return (
      <section className="create-post-section">
        <form onSubmit={this.handleSubmit}>
          <h2>Create Post</h2>
          <input id="image" type="text" placeholder="Image" />
          <input id="text" type="text" placeholder="Text" />
          <button type="submit" class="btn-general-post">
            Create
          </button>
        </form>

        <button className="btn-cancel-post" onClick={this.handleCancelClick}>
          <img
            class="img-cancel-post"
            src="./src/assets/icon-cancel-post.png"
          />
        </button>
      </section>
    );
  }
}

export default CreatePost;
