const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// 🔹 Check MongoDB connection status
app.get("/test-db", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ success: true, message: "✅ MongoDB Connected", collections });
  } catch (error) {
    res.json({ success: false, message: "❌ MongoDB NOT Connected" });
  }
});

// Set up the server
const PORT = process.env.PORT || 5000;
app.use("/products", require("./routes/products"));
app.post("/products/add", async (req, res) => {
  try {
      const { name, price, description } = req.body;
      const newProduct = new Product({ name, price, description });
      await newProduct.save();
      res.status(201).json({ success: true, message: "Product added successfully!", product: newProduct });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error adding product", error });
  }
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
