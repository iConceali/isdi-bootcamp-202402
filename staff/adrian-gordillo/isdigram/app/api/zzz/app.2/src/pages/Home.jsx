import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { Component } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import EditPost from "../components/EditPost";
import Header from "../components/Header";

class Home extends Component {
  constructor() {
    logger.debug("Home");

    super();

    try {
      const user = logic.retrieveUser();

      this.user = user;
    } catch (error) {
      showFeedBack(error);
    }
    this.state = { view: null, stamp: null, post: null };
  }

  setState(state) {
    logger.debug("Home -> setState", JSON.stringify(state));

    super.setState(state);
  }

  clearView = () => this.setState({ view: null });

  handleCreatePostCancelClick = () => this.clearView();

  handlePostCreated = () => this.setState({ view: null, stamp: Date.now() });

  handleCreatePostClick = () => this.setState({ view: "create-post" });

  handleLogoutClick = () => {
    try {
      logic.logoutUser();
    } catch (error) {
      logic.cleanUpLoggedInUser();
    } finally {
      this.props.onUserLoggedOut();
    }
  };

  handleEditPostCancelClick = () => this.clearView();

  handleEditPostClick = (post) => this.setState({ view: "edit-post", post });

  handlePostEdited = () =>
    this.setState({ view: null, stamp: Date.now(), post: null });

  render() {
    logger.debug("Home -> render");

    return (
      <>
        <header>
          <img className="user-avatar" src="../src/assets/avatar-empty.webp" />
          <button className="logout-button"></button>
          <button className="chat-button"></button>
        </header>

        <main className="main">
          <h1>Hello, {this.user.name}</h1>
          <PostList
            stamp={this.state.stamp}
            onEditPostClick={this.handleEditPostClick}
          />
          {this.state.view === "create-post" && (
            <CreatePost
              onCancelClick={this.handleCreatePostCancelClick}
              onPostCreated={this.handlePostCreated}
            />
          )}
          {this.state.view === "edit-post" && (
            <EditPost
              post={this.state.post}
              onCancelClick={this.handleEditPostCancelClick}
              onPostEdited={this.handlePostEdited}
            />
          )}
        </main>

        <footer>
          <div className="btns-footer">
            <button className="home-button">
              <img
                className="home-button"
                src="./src/assets/icon-home-on.png"
              />
            </button>
            <button className="search-button">
              <img
                className="search-button"
                src="./src/assets/icon-search-off.png"
              />
            </button>
            <button
              onClick={this.handleCreatePostClick}
              className="create-post-button"
            >
              <img
                className="create-post-button"
                src="./src/assets/icon-post-off.png"
              />
            </button>
            <button className="reels-button">
              <img
                className="reels-button"
                src="./src/assets/icon-reels-off.png"
              />
            </button>
            <button className="profile-button">
              <img
                className="profile-button"
                src="./src/assets/icon-profile-off.png"
              />
            </button>
          </div>
        </footer>
      </>
    );
  }
}

export default Home;
