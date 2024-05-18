// api/controllers/user/createUserController.js

import createUser from "../../services/user/createUser.js";
import { errors } from "com";

const { DuplicityError } = errors;

const createUserController = async (req, res) => {
  try {
    console.log(
      "Complete req.body received:",
      JSON.stringify(req.body, null, 2)
    );
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Request body is empty or invalid" });
    }
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "InternalServerError",
      message: error.message || "An unexpected error occurred",
    });
  }
};

export default createUserController;
