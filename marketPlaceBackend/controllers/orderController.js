import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { calculateProductPrice } from "../utils/priceUtils.js";

/**
 * Get all Orders
 * @param {*} req
 * @param {*} res
 */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get Order by ID
 * @param {*} req
 * @param {*} res
 */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", err: err.message });
  }
};

/**
 * Add new order
 * @param {*} req
 * @param {*} res
 */
export const addOrder = async (req, res) => {
  try {
    const { userId, products, status } = req.body;

    // Assuming each product in the products array has productId and quantity
    const formattedProducts = await Promise.all(
      products.map(async (product) => {
        const { productId, quantity } = product;

        //fetch Product details dynamically
        const fetchedProduct = await Product.findById(productId);

        const calculatedPrice = await calculateProductPrice(
          productId,
          quantity
        );

        return {
          productId,
          price: calculatedPrice,
          quantity,
        };
      })
    );

    const newOrder = new Order({
      userId,
      products: formattedProducts,
      status,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error adding Order", err: err.message });
  }
};

/**
 * Update Order by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { products, status } = req.body;

    // Find the existing order
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Existing Order:", existingOrder);
    console.log("Request Body:", req.body);

    let updatedProducts = [];

    if (products !== undefined) {
      console.log("Updating products");

      updatedProducts = await Promise.all(
        existingOrder.products.map(async (existingProduct) => {
          const updatedProduct = products.find(
            (p) => p.productId === existingProduct.productId.toString()
          );

          if (updatedProduct) {
            const price = await calculateProductPrice(
              existingProduct.productId,
              updatedProduct.quantity
            );
            return {
              ...existingProduct.toObject(),
              quantity: updatedProduct.quantity,
              price,
            };
          }

          return existingProduct;
        })
      );

      const newProducts = await Promise.all(
        products
          .filter(
            (p) =>
              !existingOrder.products.some(
                (ep) => ep.productId.toString() === p.productId
              )
          )
          .map(async (newProduct) => {
            const price = await calculateProductPrice(
              newProduct.productId,
              newProduct.quantity
            );
            return { ...newProduct, price };
          })
      );

      updatedProducts = [...updatedProducts, ...newProducts];
    } else {
      console.log("No products provided");
      updatedProducts = existingOrder.products;
    }

    console.log("Updated Products:", updatedProducts);

    // Find the order by ID and update the rest of it
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        products: updatedProducts,
        status: status || existingOrder.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Updated Order:", order);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error updating order", err: err.message });
  }
};

/**
 * Delete Order by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(deletedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", err: err.message });
  }
};
