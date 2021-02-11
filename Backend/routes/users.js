const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const AuthTokenVerification = require("./TokenVerify");

router.get("/all", AuthTokenVerification, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.get("/:UserId", AuthTokenVerification, async (req, res) => {
  try {
    const user = await User.findById(req.params.UserId);
    res.json(user);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.patch("/update", AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.json({
        message: "Access denied",
      });
    }
    const user = await User.findById(req.user);
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.json({
        message: "Incorrect password",
      });
    }

    if (validPass) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.changepassword, salt);
    }

    const UpdatedUser = await User.updateMany(
      {
        _id: req.user,
      },
      {
        $set: {
          name: req.body.name || user.name,
          email: req.body.email || user.email,
          password: hashedPassword || user.password,
        },
      }
    );
    res.json({
      message: "successfully updated",
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.json({
      message: error.details[0].message,
    });
  }

  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.json({
      message: "Account with this email already exists",
    });
  }

  //hashing the send password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const SavedUser = await user.save();
    res.json({
      user: user._id,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.json({
      message: error.details[0].message,
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.json({
      message: "Account with this email does not exists",
    });
  }

  //comparing the send password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.json({
      message: "Email or Password is incorrect",
    });
  }

  const token = JWT.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  res.json({
    name: user.name,
    user: user._id,
    token: token,
  });
});

module.exports = router;
