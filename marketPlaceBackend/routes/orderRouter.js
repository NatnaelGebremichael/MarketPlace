import express from "express";
import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrderById,
  deleteOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/add", addOrder);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

export default router;
