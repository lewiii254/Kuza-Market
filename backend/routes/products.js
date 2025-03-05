const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Create a product
router.post("/add", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added!", product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.json({ success: true, products }); // Return the products as JSON
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching products", error });
    }
});
router.put("/update/:id", async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // Get product ID from URL
            req.body, // Get new data from request body
            { new: true } // Return updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated!", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Delete a product
router.delete("/delete/:id", async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.json({ success: true, message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  


module.exports = router;
