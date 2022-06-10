const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  price: Number,
});

orderSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

exports.Order = mongoose.model("Order", orderSchema);
