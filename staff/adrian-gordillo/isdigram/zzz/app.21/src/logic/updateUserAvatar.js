import { validate, errors } from "com";

function updateUserAvatar(avatarUrl) {
  validate.url(avatarUrl, "avatarUrl");

  var userId = sessionStorage.userId;

  var user = db.users.findOne(function (user) {
    return user.id === userId;
  });

  if (!user) throw new Error("user not found");

  user.avatar = avatarUrl;

  db.users.updateOne(user);
}

export default updateUserAvatar;
