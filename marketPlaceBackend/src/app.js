require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express(); //Create Express Application
app.use(express.json()); //for parsing application/json

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Requiring the product routes
const productsRouter = require("./routes/products");

// Use productsRouter for any requests going to '/products'
app.use("/products", productsRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
