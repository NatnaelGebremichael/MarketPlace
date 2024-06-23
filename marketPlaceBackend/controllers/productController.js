import Product from "../models/product.model.js";

/**
 * Get all Products
 * @param {*} req
 * @param {*} res
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get Product by ID
 * @param {*} req
 * @param {*} res
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", err: err.message });
  }
};

/**
 * Get Product by Name
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getProductByName = async (req, res) => {
  try {
    const { productname } = req.params;
    const product = await Product.findOne({ productname });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", err: err.message });
  }
};

/**
 * Add new product
 * @param {*} req
 * @param {*} res
 */
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stockQuantity,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error adding Product", err: err.message });
  }
};

/**
 * Update Product by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", err: err.message });
  }
};

/**
 * Delete Product by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", err: err.message });
  }
};
