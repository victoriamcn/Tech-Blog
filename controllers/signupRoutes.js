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
                res.render("register", { error: "User already exists. Please try registering with a new username", title: "Register - TechBlog" })
            } else {
                const salt = await bcrypt.genSalt(10)
                await bcrypt.hash(req.body.password, salt).then(function (hash) {
                    User.create({
                        usr_name: req.body.usr_name,
                        email: req.body.email,
                        password: hash
                    })
                    Employee.create({
                        // info goes here for employee
                        id: req.body.id,
                        username: req.body.first_name,
                    })
                })
                res.render("login", { message: "Successfully registered. Please log in.", title: "Login - TechBlog" });
            }
        })
    } catch (err) {
        //console.log(req.body.ethnicity)
        console.log(err);
        res.send(err)
    }
});

module.exports = router;