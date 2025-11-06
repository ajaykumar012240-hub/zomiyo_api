const mongoose = require("mongoose");

// ✅ Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ Model Export
module.exports = mongoose.model("Product", productSchema);
