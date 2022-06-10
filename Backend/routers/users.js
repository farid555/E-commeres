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

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    passwordHash: req.body.passwordHash,
    email: req.body.email,
    apartment: req.body.apartment,
    phone: req.body.phone,
    street: req.body.street,
    zipCode: req.body.zipCode,
    city: req.body.city,
    country: req.body.country,
    isAdmin: req.body.isAdmin,
  });

  await user.save();

  if (!user) return res.status(400).json("The user was not created");
  res.send(user);
});

module.exports = router;
