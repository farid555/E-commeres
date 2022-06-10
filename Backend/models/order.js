const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  price: Number,
});

exports.Order = mongoose.model("Order", orderSchema);
