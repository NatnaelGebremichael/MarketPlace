const router = require('./express').Router();
let Product = require('../models/product.model');

router.route('/').get(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req, res) => {
  const newProduct = new Product({ ...req.body });

  try {
    await newProduct.save();
    res.json('Product added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
