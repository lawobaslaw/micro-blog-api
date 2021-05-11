const express = require('express');
const router = new express.Router();
const User = require('../model/User');
const authGuard = require('../middleware/authGuard');

// Register user route

router.post('/user/register', async (req, res) => {
  try {
    const validateUser = await User.findOne({ email: req.body.email });
    if (validateUser) return res.status(404).json({ error: 'User Already Exist with this Email' });
    const userObject = req.body;
    userObject.dateReg = new Date()
    const newUser = new User(userObject);
    await newUser.save();

    res.status(201).json({
      message: "User Registered",
      data: newUser
    })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

// Login user route
router.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.comparePassword(email, password, res);
    const token = await user.generateAuthToken();
    res.status(200).json({
      message: "Logged in successfully",
      token, user
    })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


// Login profile route
router.get('/user/profile', authGuard, (req, res) => {
  try {
    const profile = req.user;
    res.status(200).json({
      message: "success",
      profile
    });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Logout profile route
router.patch('/user/logout', authGuard, async (req, res) => {
  try {
    const user = req.user;
    user.token = '';
    await user.save();


    res.status(200).json({
      message: "Logout Successfully",

    });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


module.exports = router;