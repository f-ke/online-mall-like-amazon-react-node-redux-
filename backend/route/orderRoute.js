import express from 'express'
import Order from '../model/orderModel'
import {isAuth} from '../util'
const router = express.Router();
router.get("/:id", isAuth, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });
router.post("/",isAuth, async(req, res)=>{
            const newOrder = new Order({
                user:req.user._id,
                orderItems: req.body.orderItems,
                shipping: req.body.shiping,
                payment:req.body.payment,
                itemPrice:req.body.itemprice,
                taxPrice:req.body.taxprice,
                shippingPrice:req.body.shipingprice,
                totalPrice:req.body.totalprice
            })
            const newOrdercreated = await newOrder.save();
            res.status(201).send({msg:"order create success", data:newOrdercreated})

})
export default router;