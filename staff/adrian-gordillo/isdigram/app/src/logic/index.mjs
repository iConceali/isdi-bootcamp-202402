import registerUser from "./registerUser";
import loginUser from "./loginUser";
import retrieveUser from "./retrieveUser";
import logoutUser from "./logoutUser";
import getLoggedInUserId from "./getLoggedInUserId";
import isUserLoggedIn from "./isUserLoggedIn";
import cleanUpLoggedInUserId from "./cleanUpLoggedInUserId";

import createPost from "./createPost";
import retrievePosts from "./retrievePosts";
import removePost from "./removePost";
import modifyPost from "./modifyPost";
import likePost from "./likePost";
import updateUserAvatar from "./updateUserAvatar";

const logic = {
  registerUser,
  loginUser,
  retrieveUser,
  updateUserAvatar,
  logoutUser,
  getLoggedInUserId,
  isUserLoggedIn,
  cleanUpLoggedInUserId,

  createPost,
  retrievePosts,
  removePost,
  modifyPost,
  likePost,
};

export default logic;
