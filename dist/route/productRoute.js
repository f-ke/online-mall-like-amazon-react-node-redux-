"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _productModel = _interopRequireDefault(require("../model/productModel"));

var _express = _interopRequireDefault(require("express"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  const products = await _productModel.default.find({});
  res.send(products);
});
router.get("/:id", async (req, res) => {
  const product = await _productModel.default.findOne({
    _id: req.params.id
  });

  if (product) {
    res.send(product);
  } else {
    res.status(401).send({
      msg: 'not find'
    });
  }
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const product = new _productModel.default({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).send({
      message: "newProduct create",
      data: newProduct
    });
  }

  return res.status(500).send({
    message: 'failed to create'
  });
});
router.put("/:id", _util.isAuth, _util.isAdmin, async (req, res) => {
  //console.log(req.body)
  const productId = req.params.id;
  const product = await _productModel.default.findOne({
    _id: productId
  });

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const newProduct = await product.save();

    if (newProduct) {
      return res.status(201).send({
        msg: "update suceessfully",
        product: newProduct
      });
    }
  }

  return res.status(500).send({
    msg: "update failed"
  });
});
router.delete("/:id", _util.isAuth, _util.isAdmin, async (req, res) => {
  const productId = req.params.id;
  const deleteProduct = await _productModel.default.findOne({
    _id: productId
  });

  if (deleteProduct) {
    await deleteProduct.remove();
    return res.send({
      msg: "sucessful delete"
    });
  }

  return res.send({
    msg: "delete fail"
  });
});
var _default = router;
exports.default = _default;