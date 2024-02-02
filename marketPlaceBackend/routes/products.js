import express from "express";
import Product from "../models/product.model.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const products = await find();
    res.json(products);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/add").post(async (req, res) => {
  const newProduct = new Product({ ...req.body });

  try {
    await newProduct.save();
    res.json("Product added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
