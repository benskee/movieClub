const express = require('express');
const _ = require('lodash')
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send( {
        "type": "email",
        "message": "Email already registered."
    });

    let user2 = await User.findOne({ username: username });
    if (user2) return res.status(400).send( {
        "type": "username",
        "message": "username already registered."
    });

    const newUser = new User({
        username: username,
        email: email,
        password: password
    })

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save()
    
    const token = newUser.generateAuthToken()
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
})

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
        return res.status(404).send("User not found.");

    res.send(user);
});

router.put('/:id', async (req, res) => {
    let user = await User.findOne({ username: req.body.originalUsername });
    if(!user) return res.status(404).send("User not found.")
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.');

    let duplicate = await User.findOne({ username: req.body.username });
    if (duplicate) return res.status(400).send('Username already taken. Please select another name.')

    user = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email
    })
    res.send(user)
})

module.exports = router;