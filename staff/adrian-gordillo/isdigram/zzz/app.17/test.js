function retrieveUser(userId, callback) {
  validateText(userId, "userId", true);
  validateCallback(callback);

  db.users.findOne(
    (user) => user.id === userId,
    (error, user) => {
      if (error) {
        callback(error);

        return;
      }

      if (!user) {
        callback(new Error("user not found"));

        return;
      }

      delete user.id;
      delete user.password;
      delete user.status;

      callback(null, user);
    }
  );
}
