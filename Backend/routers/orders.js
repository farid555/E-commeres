const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");

router.get("/", async (req, res) => {
  const productList = await Order.find();
  if (!productList) {
    res.status(500).json({ success: flase });
  }
  res.send(productList);
});

router.post(`/`, (req, res) => {
  const products = new Order({
    name: req.body.name,
    price: req.body.price,
  });
  products
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

module.exports = router;
