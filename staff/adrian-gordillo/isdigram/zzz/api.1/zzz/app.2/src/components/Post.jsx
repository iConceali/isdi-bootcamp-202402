import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { Component } from "react";

class Post extends Component {
  constructor() {
    logger.debug("Post");

    super();
  }

  handleDeleteClick = (postId) => {
    if (confirm("delete post?"))
      try {
        logic.removePost(postId);

        this.props.onDeleted();
      } catch (error) {
        showFeedback(error);
      }
  };

  handleEditClick = (post) => this.props.onEditClick(post);

  render() {
    const { item: post } = this.props;

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
              onClick={() => this.handleDeleteClick(post.id)}
            >
              🗑️
            </button>
            <button
              className="btn-edit-post"
              onClick={() => this.handleEditClick(post)}
            >
              📝
            </button>
          </>
        )}
      </article>
    );
  }
}

export default Post;
