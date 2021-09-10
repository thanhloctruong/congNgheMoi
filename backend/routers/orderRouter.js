import express from "express";
import expressAsyncHanler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "./untils.js";

const orderRouter = express();

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
export default orderRouter;
