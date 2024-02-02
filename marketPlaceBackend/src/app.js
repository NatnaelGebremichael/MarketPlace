import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";
import express, { json } from "express";
import productsRouter from "../routes/products.js";

const app = express(); //Create Express Application
app.use(json()); //for parsing application/json

// Connect to MongoDB
// Read and Encode credentials
const encodedUsername = encodeURIComponent(process.env.rawUsername);
const encodedPassword = encodeURIComponent(process.env.rawPassword);
const uri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${process.env.clusterUrl}?retryWrites=true&w=majority`;

connect(uri)
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.error("Could not connect to MongoDB...", err));

//Use productsRouter for any requests going to '/products'
app.use("/products", productsRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
