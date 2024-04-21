// api/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

router.get("/", authenticate, getAllUsers); // Solo usuarios autenticados
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:id", authenticate, getUser); // Solo usuarios autenticados
router.put("/:id", authenticate, updateUser); // Solo usuarios autenticados
router.delete("/:id", authenticate, deleteUser); // Solo usuarios autenticados

module.exports = router;
