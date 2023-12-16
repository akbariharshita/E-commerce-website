const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(422).json({ error: "plz filles  the field properly" });
    };

    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt( password, process.env.PASS_SEC ).toString(),
    });

    try {
        const saveduser = await newUser.save();
        res.status(201).json(saveduser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json("Wrong credentials");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            return res.status(401).json("Wrong password");
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "5d" }
        );
        
        user.tokens = user.tokens.concat({ token: accessToken });
        await user.save();

        const { passwords, ...others } = user._doc;

        return res.status(200).json({ ...others, accessToken });

    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

router.get("/logout", (req, res) => {
    res.status(200).send('User Logout');
});

module.exports = router