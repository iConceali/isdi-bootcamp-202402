import { logger, showFeedback } from "../utils";

import logic from "../logic";

function CreatePost(props) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const image = form.image.value;
    const text = form.text.value;

    try {
      logic.createPost(image, text);

      form.reset();

      props.onPostCreated();
    } catch (error) {
      showFeedback(error);
    }
  };

  const handleCancelClick = () => props.onCancelClick();

  logger.debug("CreatePost -> render");

  return (
    <section className="create-post-section">
      <form onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        <input id="image" type="text" placeholder="Image" />
        <input id="text" type="text" placeholder="Text" />
        <button type="submit" className="btn-general-post">
          Create
        </button>
      </form>

      <button className="btn-cancel-post" onClick={handleCancelClick}>
        <img
          className="img-cancel-post"
          src="./src/assets/icon-cancel-post.png"
        />
      </button>
    </section>
  );
}

export default CreatePost;
