function retrieveUsersWithStatus(userId, callback) {
  try {
    validateText(userId, "userId", true);
    validateCallback(callback);

    db.users.getAll((error, users) => {
      if (error) {
        callback(error);
        return;
      }

      if (!users || users.length === 0) {
        callback(new Error("No users found"));
        return;
      }

      // Sort users by status
      users.sort((a, b) => {
        if (a.status === b.status) {
          return a.username.localeCompare(b.username); // If status is the same, sort by username
        } else {
          return a.status === "online" ? -1 : 1; // Sort online users before offline users
        }
      });

      // Omit sensitive data
      users.forEach((user) => {
        delete user.name;
        delete user.email;
        delete user.birthdate;
        delete user.id;
        delete user.password;
      });

      callback(null, users);
    });
  } catch (error) {
    callback(error);
  }
}
