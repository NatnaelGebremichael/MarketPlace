import express from "express";
import {
  getProducts,
  getProductById,
  getProductByName,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/name/:name", getProductByName);
router.post("/add", addProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
