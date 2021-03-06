import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../../frontend/src/data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { isAdmin, isAuth } from "../utils.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

// SignIn Router

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
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// Register Router

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compare(req.body.email, user.email)) {
        res.status(401).send({ message: "Email already in use." });
      }
    } else {
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
      });

      const createdNewUser = await user.save();

      res.send({
        _id: createdNewUser._id,
        name: createdNewUser.name,
        email: createdNewUser.email,
        isAdmin: createdNewUser.isAdmin,
        isSeller: createdNewUser.isSeller,
        token: generateToken(createdNewUser),
      });
    }
  })
);

// User Profile Details Router

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// Update User Profile Details

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 12);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        isAdmin: updatedUser.isAdmin,
        isSeller: updatedUser.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

// Get List of users in Users collection as Admin

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});

    res.send(users);
  })
);

// Delete a User as Admin

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "odnir@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// Designate a User to Admin or Seller as Admin

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const checkIfUserHasSameEmailAsAnotherInDB = await User.findOne({
      email: req.body.email,
    });

    const user = await User.findById(req.params.id);

    if (checkIfUserHasSameEmailAsAnotherInDB) {
      if (
        bcrypt.compare(
          req.body.email,
          checkIfUserHasSameEmailAsAnotherInDB.email
        )
      ) {
        res.status(401).send({ message: "Email already in use." });
      }
    } else if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRouter;
