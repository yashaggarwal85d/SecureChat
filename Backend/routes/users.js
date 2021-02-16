const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const AuthTokenVerification = require("./TokenVerify");

router.get("/all", AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
    }
    const users = await User.find();
    res.json(users);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/:UserId", AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
    }
    const user = await User.findById(req.params.UserId);
    res.json(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch("/update", AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
    }
    const user = await User.findById(req.user._id);
    var hashedPassword = null;

    if (req.body.password) {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(400).send("Incorrect password");
      }

      if (validPass) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.changepassword, salt);
      }
    }

    const UpdatedUser = await User.updateMany(
      {
        _id: req.user._id,
      },
      {
        $set: {
          name: req.body.name || user.name,
          email: req.body.email || user.email,
          password: hashedPassword || user.password,
          profile_pic: req.body.profile_pic || user.profile_pic,
          status: req.body.status || user.status,
        },
      }
    );
    res.json({
      message: "successfully updated",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist) {
    return res.status(400).send("Account with this email already exists");
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
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).send("Account with this email does not exists");
  }

  //comparing the send password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Email or Password is incorrect");
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
    profile_pic: user.profile_pic,
  });
});

module.exports = router;
