const mongoose = require("mongoose");

// Define the schema (structure of the product)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
const Product = mongoose.model("Product", productSchema);

// Export the model so it can be used in other files
module.exports = Product;
