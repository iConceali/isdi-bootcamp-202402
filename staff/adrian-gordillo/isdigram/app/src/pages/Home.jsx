import utils from "../utils";

import logic from "../logic";

import { Component } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";

class Home extends Component {
  constructor() {
    super();

    try {
      const user = logic.retrieveUser();

      this.user = user;
    } catch (error) {
      utils.showFeedBack();
    }
    this.state = { view: null, stamp: null };
  }

  render() {
    return (
      <main className="main">
        <h1>Hello, adrian!</h1>

        <PostList refreshStamp={this.state.stamp} />

        {this.state.view === "create-post" && (
          <CreatePost
            onCancelClick={() => this.setState({ view: null })}
            onPostCreated={() =>
              this.setState({ view: null, stamp: Date.now() })
            }
          />
        )}

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
              onClick={() => this.setState({ view: "create-post" })}
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
      </main>
    );
  }
}

export default Home;
