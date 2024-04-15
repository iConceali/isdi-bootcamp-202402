import registerUser from "./registerUser.ts";
import loginUser from "./authenticateUser.ts";
import retrieveUser from "./retrieveUser.ts";
import logoutUser from "./logoutUser.ts";

import createPost from "./createPost.ts";
import retrievePosts from "./retrievePosts.ts";
import removePost from "./removePost.ts";
import modifyPost from "./modifyPost.ts";
import authenticateUser from "./authenticateUser.ts";

const logic = {
  users: null,
  posts: null,

  registerUser,
  authenticateUser,
  retrieveUser,
  logoutUser,

  createPost,
  retrievePosts,
  removePost,
  modifyPost,
};

export default logic;
