const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const productList = await User.find();
  if (!productList) {
    res.status(500).json({ success: flase });
  }
  res.send(productList);
});

router.post(`/`, (req, res) => {
  const products = new User({
    name: req.body.name,
    age: req.body.age,
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
