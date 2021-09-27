import express from "express";
import expressAsyncHanler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../untils.js";

const orderRouter = express();
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHanler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHanler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHanler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
      console.log(order);
    } else {
      res.status(404).send({ message: "order not found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHanler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: " Order not found" });
    }
  })
);

export default orderRouter;
