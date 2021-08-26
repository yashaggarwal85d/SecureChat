const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation,
} = require('../validation/validation');
const AuthTokenVerification = require('../validation/TokenVerify');

router.get('/all', AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send('Access denied');
    }
    const users = await User.find({ _id: { $nin: req.user } });
    res.json(users);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get('/:UserId', AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send('Access denied');
    }
    const user = await User.findById(req.params.UserId);
    res.json(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch('/update', AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send('Access denied');
    }
    const user = await User.findById(req.user._id);
    var hashedPassword = null;

    if (req.body.password) {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(400).send('Incorrect password');
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
          phone: req.body.phone || user.phone,
          password: hashedPassword || user.password,
          status: req.body.status || user.status,
        },
      }
    );
    res.json({
      message: 'successfully updated',
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const phoneExist = await User.findOne({
    phone: req.body.phone,
  });
  if (phoneExist) {
    return res
      .status(400)
      .send('Account with this Phone number already exists');
  }

  //hashing the send password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    password: hashedPassword,
  });

  try {
    const SavedUser = await user.save();
    const token = JWT.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECRET
    );
    res.json({
      user: user._id,
      token: token,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({
    phone: req.body.phone,
  });
  if (!user) {
    return res
      .status(400)
      .send('Account with this Phone number does not exists');
  }

  //comparing the send password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Phone or Password is incorrect');
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
    status: user.status,
  });
});

router.post('/CheckContacts', AuthTokenVerification, async (req, res) => {
  var f = 0;
  var contacts = [];
  for (const number of req.body.PhoneNumbers) {
    const user = await User.findOne({
      phone: number,
    });
    if (user) {
      f = f + 1;
      var body = {
        members: [
          {
            id: user._id,
          },
        ],
        isDark: false,
      };
      contacts.push(body);
    }
  }
  if (f) {
    res.json({
      success: true,
      message: `${f} new contacts added`,
      contacts: contacts,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

module.exports = router;
