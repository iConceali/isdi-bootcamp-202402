import utils from "../utils.mjs";

import logic from "../logic.mjs";

import Image from "./core/Image.mjs";
import Component from "./core/Component.mjs";
import EditPost from "./EditPost.mjs";
import Button from "./core/Button.mjs";

class Post extends Component {
  constructor(post) {
    super("article");

    // this.addClass("post");

    const divPostButtons = new Component();
    divPostButtons.addClass("div-post-buttons");

    const likeButton = new Button();
    likeButton.addClass("btn-like-off");

    // Verificar si el usuario actual ha dado like al post
    if (post.likes.includes(logic.getLoggedInUserId())) {
      likeButton.addClass("btn-like-on");
    }

    const commentButton = new Button();
    commentButton.addClass("btn-comment");

    const shareButton = new Button();
    shareButton.addClass("btn-share");

    divPostButtons.add(likeButton, commentButton, shareButton);

    const divHeaderPost = new Component();
    divHeaderPost.addClass("div-header-post");

    const divAuthorPost = new Component();
    divAuthorPost.addClass("div-author-post");
    //----------------------------------------------

    let avatarImg; // Declara avatarImg fuera del bloque if

    const userUsername = post.author.username;
    const usersData = JSON.parse(localStorage.getItem("users"));
    const currentUser = usersData.find(
      (user) => user.username === userUsername
    );

    if (currentUser) {
      const savedAvatarUrl = currentUser.avatar;

      avatarImg = new Image(); // Asigna avatarImg aquí
      avatarImg.addClass("user-avatar-post");
      avatarImg.setSource(savedAvatarUrl || "../images/avatar-empty.webp");
    } else {
      // El usuario actual no se encontró en los datos almacenados
      avatarImg = new Image(); // Asigna avatarImg aquí
      avatarImg.addClass("user-avatar");
      avatarImg.setSource("../images/avatar-empty.webp");
    }

    const author = new Component("h3");
    author.setText(post.author.username);

    divAuthorPost.add(avatarImg, author);

    const picture = new Image();
    picture.setSource(post.image);
    picture.addClass("img-post");

    const divPostText = new Component();
    divPostText.addClass("div-post-text");

    const paragraph = new Component("p");
    paragraph.setText(post.text);

    const dateTime = new Component("time");
    dateTime.setText(post.date);

    divPostText.add(paragraph, dateTime);
    this.add(divHeaderPost, picture, divPostButtons, divPostText);

    likeButton.onClick(() => {
      likeButton.removeClass("btn-like-off");
      likeButton.addClass("btn-like-on");

      logic.likePost(post.id);
    });

    if (post.author.id === logic.getLoggedInUserId()) {
      const deleteButton = new Button();
      // deleteButton.setText("🗑️");
      deleteButton.addClass("btn-delete-post");
      deleteButton.setText("Delete");

      deleteButton.onClick(() => {
        if (confirm("delete post?"))
          try {
            logic.removePost(post.id);

            this._onDeletedCallback();
          } catch (error) {
            utils.showFeedback(error);
          }
      });

      const editButton = new Button();
      // editButton.setText("📝");
      editButton.addClass("btn-edit-post");
      editButton.setText("Edit");

      editButton.onClick(() => {
        if (!EditPost.active) {
          const editPost = new EditPost(post);

          // editPost.onCancelClick(() => this.remove(editPost));

          editPost.onPostEdited(() => this._onEditedCallback());

          this.add(editPost);
        }
      });

      // divPostButtons.add(deleteButton, editButton);

      //todo INICIO BOTÓN POST DESPLEGABLE------------------------------
      const dropdownButton = new Button();
      // dropdownButton.setText("&#9776;");
      dropdownButton.addClass("dropbtn");

      const dropdownContent = new Component();
      dropdownContent.addClass("dropdown-content");

      const menuPost = new Component();
      menuPost.addClass("div-menu-post");
      menuPost.add(dropdownButton, dropdownContent);

      const buttonsContainer = new Component();
      buttonsContainer.addClass("buttons-menu-container");

      buttonsContainer.add(deleteButton, editButton);

      dropdownContent.add(buttonsContainer);

      dropdownButton.onClick(() => {
        dropdownContent.toggleClass("show");
      });

      divHeaderPost.add(divAuthorPost, menuPost);

      window.onclick = function (event) {
        if (!event.target.matches(".dropbtn")) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
              openDropdown.classList.remove("show");
            }
          }
        }
      };

      //todo FIN BOTÓN POST DESPLEGABLE---------------------------------
    }

    this._onDeletedCallback = null;
    this._onEditedCallback = null;
  }

  onDeleted(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onDeletedCallback = callback;
  }

  onEdited(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onEditedCallback = callback;
  }
}

export default Post;
