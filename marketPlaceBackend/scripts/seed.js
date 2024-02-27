import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Rating from "../models/rating.model.js";
import Transaction from "../models/transaction.model.js";

dotenv.config();

const encodedUsername = encodeURIComponent(process.env.rawUsername);
const encodedPassword = encodeURIComponent(process.env.rawPassword);
const uri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${process.env.clusterUrl}${process.env.db}?retryWrites=true&w=majority`;

/**Making a connection with MongoDB */
mongoose
  .connect(uri)
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.error("Could not connect to MongoDB...", err));

/** User Seed Data */
const seedUsers = [
  {
    username: "user1",
    email: "user1@example.com",
    role: "Customer",
    password: "password123",
  },
];

/** Product Seed Data */
const seedProducts = [
  {
    name: "Product 1",
    description: "Description 1",
    price: 10,
    stockQuantity: 100,
  },
];

/**
 * adding order after User and Product because we need their ID
 */
const seedDatabase = async () => {
  // Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  await Rating.deleteMany({});
  await Transaction.deleteMany({});

  // Insert new seed data and get the id
  const insertedUsers = await User.insertMany(seedUsers);
  const insertedProducts = await Product.insertMany(seedProducts);

  /**
   * Add seed data for order
   * Assuming you want to use the first user and product for the order seed use [0]
   **/
  const seedOrders = [
    {
      userId: insertedUsers[0]._id,
      products: [
        {
          productId: insertedProducts[0]._id,
          price: insertedProducts[0].price,
          quantity: 2,
        },
      ],
      status: "pending",
    },
  ];
  const insertedOrder = await Order.insertMany(seedOrders); // Insert orders

  /** Add rating and transaction Seed Data */
  const seedRating = [
    {
      productId: insertedProducts[0]._id,
      rating: 2,
    },
  ];

  const seedTransactions = [
    {
      orderId: insertedOrder[0]._id, // Use actual ObjectId from your seeded Orders
      userId: insertedOrder[0].userId, // Use actual ObjectId from your seeded Users
      amount: insertedOrder[0].products.reduce((total, product) => {
        const productPrice = product.price; // Assuming price is directly available and correct
        const productQuantity = product.quantity;
        return total + productPrice * productQuantity;
      }, 0),
    },
  ];

  await Rating.insertMany(seedRating);
  await Transaction.insertMany(seedTransactions);

  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDatabase().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
