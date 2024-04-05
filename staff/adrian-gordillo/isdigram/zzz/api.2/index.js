import express from "express";
import logic from "./logic/index.mjs";

const api = express();

const jsonBodyParser = express.json();

api.post("/users", jsonBodyParser, (req, res) => {
  try {
    const { name, birthdate, email, username, password } = req.body;

    logic.registerUser(name, birthdate, email, username, password, (error) => {
      if (error) {
        res
          .status(400)
          .json({ error: error.constructor.name, message: error.message });

        return;
      }

      res.status(201).send();
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

// TODO login user -> POST /users/auth

// TODO retrieve user -> GET /users

// TODO retrieve posts -> GET /posts

// ...

api.listen(8080, () => console.log("API listening on port 8080"));
