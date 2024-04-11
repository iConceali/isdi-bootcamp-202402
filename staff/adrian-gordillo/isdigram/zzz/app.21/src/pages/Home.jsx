import { logger, showFeedback } from "../utils";

import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import EditPost from "../components/EditPost";

function Home(props) {
  const [user, setUser] = useState(null);
  const [view, setView] = useState(null);
  const [stamp, setStamp] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    try {
      logic.retrieveUser((error, user) => {
        if (error) {
          showFeedback(error);

          return;
        }

        setUser(user);
      });
    } catch (error) {
      showFeedback(error);
    }
  }, []);

  const clearView = () => setView(null);

  const handleCreatePostCancelClick = () => clearView();

  const handlePostCreated = () => {
    clearView();
    setStamp(Date.now());
  };

  const handleCreatePostClick = () => setView("create-post");

  const handleLogoutClick = () => {
    try {
      logic.logoutUser();
    } catch (error) {
      logic.cleanUpLoggedInUser();
    } finally {
      props.onUserLoggedOut();
    }
  };

  const handleEditPostCancelClick = () => clearView();

  const handleEditPostClick = (post) => {
    setView("edit-post");
    setPost(post);
  };

  const handlePostEdited = () => {
    clearView();
    setStamp(Date.now());
    setPost(null);
  };

  logger.debug("Home -> render");

  return (
    <>
      <header>
        <img className="user-avatar" src="../src/assets/avatar-empty.webp" />
        <button className="logout-button"></button>
        <button className="chat-button"></button>
      </header>

      <main className="main">
        {this.state.user && <h1>Hello, {this.state.user.name}!</h1>}
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
            <img className="home-button" src="./src/assets/icon-home-on.png" />
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

export default Home;
