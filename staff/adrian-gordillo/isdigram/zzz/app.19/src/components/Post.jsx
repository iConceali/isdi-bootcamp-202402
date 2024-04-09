import { logger, showFeedback } from "../utils";

import logic from "../logic";

function Post(props) {
  const handleDeleteClick = (postId) => {
    if (confirm("delete post?"))
      try {
        logic.removePost(postId);

        props.onDeleted();
      } catch (error) {
        showFeedback(error);
      }
  };

  const handleEditClick = (post) => props.onEditClick(post);

  logger.debug("Post -> render");

  const { item: post } = props;

  return (
    <article>
      <h3>{post.author.username}</h3>
      <img src={post.image} className="img-post" />
      <div className="div-post-buttons">
        <button className="btn-like-off"></button>
        <button className="btn-comment"></button>
        <button className="btn-share"></button>
      </div>
      <div className="div-post-text">
        <p>{post.text}</p>
        <time>{post.date}</time>
      </div>

      {logic.getLoggedInUserId() === post.author.id && (
        <>
          <button
            className="btn-delete-post"
            onClick={() => handleDeleteClick(post.id)}
          >
            🗑️
          </button>
          <button
            className="btn-edit-post"
            onClick={() => handleEditClick(post)}
          >
            📝
          </button>
        </>
      )}
    </article>
  );
}

export default Post;
