const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render('dashboard', { username: req.session.username, loggedIn: req.session.loggedIn, title: "Welcome - TechBlog" })
    } else {
      res.render('login', { message: "Welcome! Please log in or signup.", title: "Login - TechBlog" })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  console.log("Dashboard GET Request")
  try {

    // Get all blog posts and JOIN with user data
    const blogpostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });

    // Serialize data so the template can read it
    const blogPosts = blogpostData.map((BlogPost) => BlogPost.get({ plain: true }));
    console.log("GET Request - Dashboard")
    // Pass serialized data and session flag into template
    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in
    });
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// /logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  console.log("New Logout POST Request")
});

module.exports = router;