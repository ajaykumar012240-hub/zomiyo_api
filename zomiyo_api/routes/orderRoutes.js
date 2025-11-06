const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ Customer ke saare orders dekhne ke liye
router.get("/customer/:customerId", async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId });
    res.status(200).json({
      message: "✅ Orders fetched successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// ✅ Seller ke saare orders dekhne ke liye
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params.sellerId });
    res.status(200).json({
      message: "✅ Seller orders fetched successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// ✅ Seller order ka status update kare
router.put("/update/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "❌ Order not found" });

    res.status(200).json({
      message: "✅ Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

module.exports = router;
