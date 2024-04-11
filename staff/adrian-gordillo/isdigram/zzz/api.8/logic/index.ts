import registerUser from "./registerUser.ts";
import loginUser from "./loginUser.ts";
import retrieveUser from "./retrieveUser.ts";
import logoutUser from "./logoutUser.ts";

import createPost from "./createPost.ts";
import retrievePosts from "./retrievePosts.ts";
import removePost from "./removePost.ts";
import modifyPost from "./modifyPost.ts";

const logic = {
  users: null,
  posts: null,

  registerUser,
  loginUser,
  retrieveUser,
  logoutUser,

  createPost,
  retrievePosts,
  removePost,
  modifyPost,
};

export default logic;
