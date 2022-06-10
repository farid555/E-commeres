const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const { Product } = require("../models/product");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  //localhost:3000/api/products?categories=233434,42522
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find({ filter }).populate("category"); //we connect with another table....select("name image -_id")/when we need very specific api we can use .select('name of api')
  if (!productList) {
    res.status(500).json({ success: flase });
  }
  res.send(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({ success: flase });
  }
  res.send(product);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category"); //user send invalid category id

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();
  if (!product) return res.status(500).send("product cannot be created!"); //Internal server errors

  res.send(product);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id!");
  }

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true },
  );
  if (!product) return res.status(400).send(" the product cannot be created!");

  res.send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the category is not found!" }); //Not found 404
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err }); // errors in general 400
    });
});

// count total product

router.get("/get/count", async (req, res) => {
  const productCounts = await Product.countDocuments(); //it doesn't work with callback countDocuments(callback)

  if (!productCounts) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCounts,
  });
});

// count total featured

router.get("/get/featured/:count", async (req, res) => {
  const count = req.body.count ? req.body.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send({
    products: products,
  });
});

module.exports = router;
