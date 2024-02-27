import express from "express";
import {
  getUsers,
  // createUser,
  // getUserById,
  // updateUser,
  // deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Define the routes for users
router.get("/", getUsers);
// router.post("/", createUser);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
