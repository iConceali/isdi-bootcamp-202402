import utils from "../utils";

import logic from "../logic";

import { Component } from "react";

class PostList extends Component {
  constructor() {
    super();

    try {
      const posts = logic.retrievePosts();

      this.state = { posts };
    } catch (error) {
      utils.showFeedback(error);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.refreshStamp !== this.props.stamp) {
      try {
        const posts = logic.retrievePosts();

        this.setState({ posts });
      } catch (error) {
        utils.showFeedback(error);
      }
    }
  }

  render() {
    return (
      <section>
        {this.state.posts.map((post) => (
          <article key={post.id}>
            <h3>{post.author.username}</h3>
            <img src={post.image} className="img-post" />
            <div className="div-post-buttons">
              <button className="btn-like-off"></button>
              <button className="btn-comment"></button>
              <button className="btn-share"></button>
              <button className="btn-delete-post">🗑️</button>
              <button className="btn-edit-post">📝</button>
            </div>
            <div className="div-post-text">
              <p>{post.text}</p>
              <time>{post.date}</time>
            </div>
          </article>
        ))}
      </section>
    );
  }
}

export default PostList;
