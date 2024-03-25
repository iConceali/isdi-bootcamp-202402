const fs = requiere("fs");

try {
  fs.readFile("./users.json", "utf8", (error, usersJson) => {
    if (error) {
      console.error(error);

      return;
    }

    console.log(usersJson);
  });
} catch (error) {
  console.error(error);
}
