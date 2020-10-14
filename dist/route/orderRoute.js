"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderModel = _interopRequireDefault(require("../model/orderModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/:id", _util.isAuth, async (req, res) => {
  const order = await _orderModel.default.findOne({
    _id: req.params.id
  });

  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});
router.post("/", _util.isAuth, async (req, res) => {
  const newOrder = new _orderModel.default({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shipping: req.body.shiping,
    payment: req.body.payment,
    itemPrice: req.body.itemprice,
    taxPrice: req.body.taxprice,
    shippingPrice: req.body.shipingprice,
    totalPrice: req.body.totalprice
  });
  const newOrdercreated = await newOrder.save();
  res.status(201).send({
    msg: "order create success",
    data: newOrdercreated
  });
});
var _default = router;
exports.default = _default;