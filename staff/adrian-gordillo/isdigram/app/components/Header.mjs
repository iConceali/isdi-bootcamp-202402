import logic from "../logic.mjs";

import Component from "./core/Component.mjs";
import Button from "./core/Button.mjs";
import Image from "./core/Image.mjs";

class Header extends Component {
  constructor() {
    super("header");

    let avatarImg; // Declara avatarImg fuera del bloque if

    const userId = sessionStorage.userId;
    const usersData = JSON.parse(localStorage.getItem("users"));
    const currentUser = usersData.find((user) => user.id === userId);
    if (currentUser) {
      const savedAvatarUrl = currentUser.avatar;

      avatarImg = new Image(); // Asigna avatarImg aquí
      avatarImg.addClass("user-avatar");
      avatarImg.setSource(savedAvatarUrl || "../images/avatar-empty.webp");
    } else {
      // El usuario actual no se encontró en los datos almacenados
      avatarImg = new Image(); // Asigna avatarImg aquí
      avatarImg.addClass("user-avatar");
      avatarImg.setSource("../images/avatar-empty.webp");
    }
    // const avatarImg = new Image();
    // avatarImg.addClass("user-avatar");
    // avatarImg.setSource(savedAvatarUrl || "../images/avatar-empty.webp");

    // Establecer la URL del avatar como origen de avatarImg, si está guardado

    // if (savedAvatarUrl) {
    //   avatarImg.setSource(savedAvatarUrl);
    // } else {
    //   // Si no hay una URL de avatar guardada, cargar la imagen por defecto
    //   avatarImg.setSource("../images/avatar-empty.webp");
    // }

    avatarImg.onClick(() => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const newAvatarUrl = e.target.result;
            avatarImg.setSource(newAvatarUrl);
            logic.updateUserAvatar(newAvatarUrl);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    });

    const backButton = new Button();
    backButton.addClass("back-button");

    const logoutButton = new Button();
    logoutButton.addClass("logout-button");

    logoutButton.onClick(() => {
      logic.logoutUser();

      this._onLogoutCallback();
    });

    const chatButton = new Button();
    chatButton.addClass("chat-button");

    chatButton.onClick(() => {
      this.add(this._backButton);

      this._onChatClickCallback();
    });

    this.add(avatarImg, logoutButton, chatButton);

    backButton.onClick(() => {
      this.remove(backButton);

      this._onHomeClickCallback();
    });

    this._avatarImg = avatarImg;
    this._logoutButton = logoutButton;
    this._chatButton = chatButton;
    this._backButton = backButton;

    this._onHomeClickCallback = null;
    this._onChatClickCallback = null;
    this._onLogoutCallback = null;
  }

  onChatClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onChatClickCallback = callback;
  }

  onHomeClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onHomeClickCallback = callback;
  }

  onLogoutClick(callback) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");

    this._onLogoutCallback = callback;
  }
}

export default Header;
