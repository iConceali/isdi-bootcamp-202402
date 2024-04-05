import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { Component } from "react";

class EditPost extends Component {
  constructor() {
    logger.debug("EditPost");

    super();
  }

  componentDidMount() {
    logger.debug("EditPost -> componentDidMount");
  }

  componentWillUnmount() {
    logger.debug("EditPost -> componentWillUnmount");
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const text = form.text.value;

    logger.debug("EditPost -> handleSubmit", text);

    try {
      logic.modifyPost(this.props.post.id, text);

      form.reset();

      this.props.onPostEdited();
    } catch (error) {
      showFeedback(error);
    }
  };

  handleCancelClick = () => this.props.onCancelClick();

  render() {
    logger.debug("EditPost -> render");

    return (
      <section className="edit-post">
        <form onSubmit={this.handleSubmit}>
          <label>Text</label>
          <input id="text" type="text" defaultValue={this.props.post.text} />

          <button className="round-button submit-button" type="submit">
            Edit
          </button>
        </form>

        <button
          className="round-button cancel-button"
          onClick={this.handleCancelClick}
        >
          Cancel
        </button>
      </section>
    );
  }
}

export default EditPost;
