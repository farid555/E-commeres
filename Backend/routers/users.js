const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    res.status(500).json({ success: flase });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res.status(500).json({ success: flase });
  }
  res.send(user);
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
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
