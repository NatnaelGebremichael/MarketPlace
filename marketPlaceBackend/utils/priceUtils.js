import Product from "../models/product.model.js";

/**
 * This function calculates the totall cost of a product based on the
 * Product price * Quantity
 * @param {*} productId
 * @param {*} quantity
 * @returns
 */
export const calculateProductPrice = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product.price * quantity;
};
