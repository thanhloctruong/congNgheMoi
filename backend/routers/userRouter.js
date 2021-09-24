import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, qrToken, isAuth } from "./untils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);
userRouter.get("/qrsignin", async (req, res) => {
  res.send({
    token: qrToken()
  });
});

userRouter.post("/submitqr", async (req, res, next) => {
  const authorQr = req.headers.authorqr;

  const authorization = req.headers.authorization;
  if (authorQr) {
    const qrToken = authorQr.slice(7, authorQr.length); // 7 is bearer
    // eslint-disable-next-line no-undef
    jwt.verify(qrToken, process.env.JWT_SECRET || "acan", err => {
      if (err) {
        res.status(401).send({ message: "invalid token" });
      } else if (authorization) {
        // req.user = decode;
        next();
        const token = authorization.slice(7, authorization.length);
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_SECRET || "acan", (err, decode) => {
          if (err) {
            res.status(401).send({ message: "invalid token" });
          } else {
            req.user = decode;
            console.log(decode);
            res.send({
              _id: decode._id,
              name: decode.name,
              email: decode.email,
              isAdmin: decode.isAdmin,
              token: generateToken(decode)
            });
          }
        });
      }
    });
  } else {
    res.status(401).send({ message: "no Token" });
  }
});

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
userRouter.post(
  "/signingoogle",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      });
      return;
    } else {
      console.log(req.body);
      // expressAsyncHandler(
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
      });
    }
  })
);
userRouter.post(
  "/signinfacebook",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      });
      return;
    } else {
      console.log(req.body);
      // expressAsyncHandler(
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
      });
    }
  })
);
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser)
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser)
      });
    }
  })
);
export default userRouter;
