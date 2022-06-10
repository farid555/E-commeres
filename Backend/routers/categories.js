const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

// get all category
router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: flase });
  }
  res.status(200).send(categoryList);
});

//get by Id
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found" });
  }
  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  if (!category)
    return res.status(404).send(" the category cannot be created!");

  res.send(category);
});

// update the current product

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon || category.icon,
      color: req.body.color,
    },
    { new: true },
  );
  if (!category)
    return res.status(400).send(" the category cannot be created!");

  res.send(category);
});

//api/v1/id:3425jbb2j4bj234j

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
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
module.exports = router;
