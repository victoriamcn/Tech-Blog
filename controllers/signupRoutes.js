const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// POST route for new user - Sign up
router.post("/", async (req, res) => {
    try {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(async (result) => {
            if (result !== null) {
                res.render("register", { error: "User already exists. Please try a new username", title: "Register - TechBlog" })
            } else {
                const salt = await bcrypt.genSalt(10)
                await bcrypt.hash(req.body.password, salt).then(function (hash) {
                    User.create({
                        username: req.body.username,
                        password: hash
                    })
                })
                res.render("login", { message: "Signup successful. Please log in.", title: "Login - TechBlog" });
            }
        })
    } catch (err) {
        console.log(err);
        res.send(err)
    }
});

module.exports = router;