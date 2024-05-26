// api/controllers/user/authenticateUserController.js

import jwt from "jsonwebtoken";
import { errors } from "com";
import authenticateUser from "../../services/user/authenticateUser";

const { NotFoundError, CredentialsError } = errors;

const authenticateUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userId = await authenticateUser(email, password);
    const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res
        .status(404)
        .json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof CredentialsError) {
      res
        .status(401)
        .json({ error: error.constructor.name, message: error.message });
    } else {
      res
        .status(500)
        .json({ error: error.constructor.name, message: error.message });
    }
  }
};

export default authenticateUserController;
