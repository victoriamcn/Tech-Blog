const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');


router.get("/", async (req, res) => {
  try {
    const usersInfo = await User.findAll()
    res.status(200).json(usersInfo)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'An error occurred while retrieving user information.' });
  }
});

// POST route for /login for existing user

router.post('/', async (req, res) => {
  console.log("Starting the login POST req")
  const userFromDb = await User.findOne({
    where:
    {
      email: req.body.email
    }
  });

  try {
    // compare entered pw to hashed pw from user db
    console.log("we are checking passwords")
    if (await bcrypt.compare(req.body.password, userFromDb.password)) {
      // if pw matches, get info from user db
      const userFromDb = await User.findOne({
        where:
        {
          password: req.body.password
        }
        // then set up their session and dashboard
      }).then((result) => { console.log(result); return result })
      req.session.loggedIn = true;
      res.render('dashboard', { username: userFromDb.first_name, loggedIn: req.session.loggedIn, title: "Dashboard - TechBlog" })
      // return;
    } else {
      console.log("Re-rendering the login page.")
      res.render('login', { error: "Incorrect Email or Password. Please try again." })
      // return;
    }
  } catch (err) {
    console.log("we got an error on logging in")
    res.render('login', { error: err, title: "Login - TechBlog" });
  }
});



module.exports = router;
