const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  qty: { type: Number, default: 1 }
});

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },      // sum of item price * qty
  platformFee: { type: Number, default: 0 },           // 10% of totalAmount
  deliveryCharge: { type: Number, default: 0 },
  sellerAmount: { type: Number, default: 0 },          // totalAmount - platformFee
  status: {
    type: String,
    enum: ["placed","accepted","picked_up","out_for_delivery","delivered","cancelled"],
    default: "placed"
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // delivery boy id
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
