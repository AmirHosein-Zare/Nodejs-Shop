const express = require("express");
const router = express.Router();
const { Product, isValidProduct } = require("../model/Product");
const {Star} = require('../model/Star');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

//get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(404).send("products Not Found");

  res.send(products);
});

//get product with id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("product Not found");

  res.send(product);
});

// post product api
router.post("/", [auth, admin], async (req, res) => {
  const { error } = isValidProduct(req.body);
  if (error) return res.status(400).send("Not Valid Data" + error);

  const newProduct = req.body;

  const product = new Product({
    name: newProduct.name,
    amount: newProduct.amount,
    price: newProduct.price,
    picture: newProduct.picture,
    explain: newProduct.explain,
    weight: newProduct.weight,
    size: newProduct.size,
    warranty: newProduct.warranty,
    type: newProduct.type,
    offPercent: newProduct.offPercent,
    neighbor: newProduct.neighbor,
    comments: [],
  });
  // save product for first time
  await product.save();

  const star = new Star({
    product: product._id,
    average: 0
  })
  // create star
  await star.save();
  // set starID in products
  product.star = star._id;
  // save product for final
  await product.save();
  res.send(product);
});

// put product api
router.put("/:id", [admin, auth], async (req, res) => {
  // check data validation
  const { error } = isValidProduct(req.body);
  if (error) return res.status(400).send("Not Valid Data");

  // check to Find product
  const check = await Product.findById(req.params.id);
  if (!check) return res.status(404).send("Product Not Found");

  const newProduct = req.body;

  // update data
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        'name': newProduct.name,
        'amount': newProduct.amount,
        'price': newProduct.price,
        'picture': newProduct.picture,
        'explain': newProduct.explain,
        'weight': newProduct.weight,
        'size': newProduct.size,
        'warranty': newProduct.warranty,
        'type': newProduct.type,
        'offPercent': newProduct.offPercent,
        'neighbor': newProduct.neighbor,
      },
    },
    { new: true }
  );

  res.send(product);
});

//delete product api
router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send("Product Not Found");
  res.send(product);
});

module.exports = router;
