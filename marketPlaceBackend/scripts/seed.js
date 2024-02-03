import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

dotenv.config();

const encodedUsername = encodeURIComponent(process.env.rawUsername);
const encodedPassword = encodeURIComponent(process.env.rawPassword);
const uri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${process.env.clusterUrl}${process.env.db}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const seedUsers = [
  { username: "user1", email: "user1@example.com", password: "password123" },
  // Add more user seed data
];

const seedProducts = [
  {
    name: "Product 1",
    description: "Description 1",
    price: 10.99,
    stockQuantity: 100,
  },
  // Add more product seed data
];

// First, insert users and products, then use their generated IDs to seed orders
const seedDatabase = async () => {
  // Clear existing data
  //await User.deleteMany({});
  //await Product.deleteMany({});
  //await Order.deleteMany({});

  // Insert new seed data
  const insertedUsers = await User.insertMany(seedUsers);
  const insertedProducts = await Product.insertMany(seedProducts);

  // Assuming you want to use the first user and product for the order seed
  const seedOrders = [
    {
      userId: insertedUsers[0]._id, // Use actual ObjectId from inserted user
      products: [
        { productId: insertedProducts[0]._id, quantity: 2 }, // Use actual ObjectId from inserted product
        // ... more products if needed
      ],
      status: "pending",
    },
    // ... more order seed data if needed
  ];

  // Insert orders
  await Order.insertMany(seedOrders);

  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDatabase().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
