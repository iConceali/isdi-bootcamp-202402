import Component from "./core/Component.mjs";
import Button from "./core/Button.mjs";
import Image from "./core/Image.mjs";

class Footer extends Component {
  constructor() {
    super("footer");

    // this.addClass("footer");

    const divFooter = new Component("div");
    divFooter.addClass("btns-footer");

    const homeButton = new Button();
    homeButton.addClass("home-button");

    const homeImg = new Image();
    homeImg.addClass("home-button");
    homeImg.setSource("../images/icon-home-on.png");

    homeButton.add(homeImg);

    const searchButton = new Button();
    searchButton.addClass("search-button");

    const searchImg = new Image();
    searchImg.addClass("search-button");
    searchImg.setSource("../images/icon-search-off.png");

    searchButton.add(searchImg);

    const createPostButton = new Button();
    createPostButton.addClass("create-post-button");

    const createPostImg = new Image();
    createPostImg.addClass("create-post-button");
    createPostImg.setSource("../images/icon-post-off.png");

    createPostButton.add(createPostImg);

    const reelsButton = new Button();
    reelsButton.addClass("reels-button");

    const reelsImg = new Image();
    reelsImg.addClass("reels-button");
    reelsImg.setSource("../images/icon-reels-off.png");

    reelsButton.add(reelsImg);

    const profileButton = new Button();
    profileButton.addClass("profile-button");

    const profileImg = new Image();
    profileImg.addClass("profile-button");
    profileImg.setSource("../images/icon-profile-off.png");

    profileButton.add(profileImg);

    divFooter.add(
      homeButton,
      searchButton,
      createPostButton,
      reelsButton,
      profileButton
    );

    this.add(divFooter);

    this._divFooter = divFooter;
    this._homeButton = homeButton;
    this._homeImg = homeImg;
    this._searchButton = searchButton;
    this._createPostButton = createPostButton;
    this._createPostImg = createPostImg;
    this._reelsButton = reelsButton;
    this._profileButton = profileButton;
    this._reelsImg = reelsImg;
  }

  onCreatePostClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._createPostButton.onClick(() => {
      this._createPostImg.setSource("../images/icon-post-on.png");

      this._homeImg.setSource("../images/icon-home-off.png");

      callback();
    });
  }

  onHomeClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._homeButton.onClick(() => {
      // this._homeImg.setSource("../images/icon-home-on.png");

      callback();
    });
  }
}

export default Footer;

// class Footer extends Component {
//   constructor() {
//     super("footer");

//      this.addClass("footer");

//     const createPostButton = new Button();
//     createPostButton.setText("➕");

//     this.add(createPostButton);

//     this._createPostButton = createPostButton;
//   }

//   onCreatePostClick(callback) {
//     this._createPostButton.onClick(callback);
//   }
// }

// export default Footer;
