const express = require("express");
const router = express.Router();
const User = require('../models/users');

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.get('/:UserId', async (req, res) => {
    try {
        const user = await User.findById(req.params.UserId);
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.patch('/:UserId', async (req, res) => {
    try {
        const user = await User.findById(req.params.UserId);
        const UpdatedUser = await User.updateMany({
            _id: req.params.UserId
        }, {
            $set: {
                first_name: req.body.first_name || user.first_name,
                last_name: req.body.first_name || user.last_name,
                email: req.body.first_name || user.email,
            }
        });
        res.json({
            message: "successfully updated"
        });
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    });

    try {
        const SavedUser = await user.save();
        res.json(SavedUser);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

module.exports = router;