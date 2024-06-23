import User from "../models/user.model.js";

/**
 * Get all Users
 * @param {*} req
 * @param {*} res
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get User by ID
 * @param {*} req
 * @param {*} res
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", err: err.message });
  }
};

/**
 * Get User by Name
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUserByName = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", err: err.message });
  }
};

/**
 * Add new user
 * @param {*} req
 * @param {*} res
 */
export const addUser = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;
    const newUser = new User({ username, email, role, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: "Error adding User", err: err.message });
  }
};

/**
 * Update User by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", err: err.message });
  }
};

/**
 * Delete User by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", err: err.message });
  }
};
