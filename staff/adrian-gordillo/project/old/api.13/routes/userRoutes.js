// api/routes/userRoutes.js

import { Router } from "express";
import authenticate from "../middleware/auth.js";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", authenticate, getAllUsers); // Solo usuarios autenticados
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:id", authenticate, getUser); // Solo usuarios autenticados
router.put("/:id", authenticate, updateUser); // Solo usuarios autenticados
router.delete("/:id", authenticate, deleteUser); // Solo usuarios autenticados

export default router;
