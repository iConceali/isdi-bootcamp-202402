import { logger, showFeedback } from "../utils";

import logic from "../logic";

function EditPost(props) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const text = form.text.value;

    logger.debug("EditPost -> handleSubmit", text);

    try {
      logic.modifyPost(props.post.id, text);

      form.reset();

      props.onPostEdited();
    } catch (error) {
      showFeedback(error);
    }
  };

  const handleCancelClick = () => props.onCancelClick();

  logger.debug("EditPost -> render");

  return (
    <section className="edit-post">
      <form onSubmit={handleSubmit}>
        <label>Text</label>
        <input id="text" type="text" defaultValue={props.post.text} />

        <button className="round-button submit-button" type="submit">
          Edit
        </button>
      </form>

      <button
        className="round-button cancel-button"
        onClick={handleCancelClick}
      >
        Cancel
      </button>
    </section>
  );
}

export default EditPost;
