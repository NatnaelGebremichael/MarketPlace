import express from "express";
import {
  getUsers,
  getUserById,
  getUserByName,
  addUser,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";

const router = express.Router();

// Define the routes for users
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/name/:username", getUserByName);
router.post("/add", addUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
