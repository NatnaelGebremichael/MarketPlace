import Order from "../models/order.model.js";

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
    res
      .status(500)
      .json({ message: "Error fetching order", err: err.message });
  }
};

/**
 * Get Order by Name
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getOrderByName = async (req, res) => {
  try {
    const { ordername } = req.params;
    const order = await Order.findOne({ ordername });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching order", err: err.message });
  }
};

/**
 * Add new order
 * @param {*} req
 * @param {*} res
 */
export const addOrder = async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity } = req.body;
    const newOrder = new Order({
      name,
      description,
      price,
      category,
      stockQuantity,
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
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating order", err: err.message });
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
    res
      .status(500)
      .json({ message: "Error deleting order", err: err.message });
  }
};
