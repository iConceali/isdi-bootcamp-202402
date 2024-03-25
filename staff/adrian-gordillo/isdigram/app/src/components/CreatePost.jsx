import utils from "../utils";

import logic from "../logic";

import { Component } from "react";

class CreatePost extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="create-post-section">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const form = event.target;

            const image = form.image.value;
            const text = form.text.value;

            try {
              logic.createPost(image, text);

              form.reset();

              this.props.onPostCreated();
            } catch (error) {
              utils.showFeedBack(error);
            }
          }}
        >
          <h2>Create Post</h2>
          <input id="image" type="text" placeholder="Image" />
          <input id="text" type="text" placeholder="Text" />
          <button type="submit" className="btn-general-post">
            Create
          </button>
        </form>

        <button
          onClick={() => this.props.onCancelClick()}
          className="btn-cancel-post"
        >
          <img
            className="img-cancel-post"
            src="./src/assets/icon-cancel-post.png"
          />
        </button>
      </section>
    );
  }
}

export default CreatePost;
