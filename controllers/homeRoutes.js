const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', withAuth, async (req, res) => {
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
    } catch (err) {
      res.status(500).json(err);
    }

  });


  // Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
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
    console.log("Dashboard GET Request")
  });

  //GET LOGIN 
router.get('/login', (req, res) => {
  // If the user is already logged in,
  // redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  console.log("Login GET Request")
  res.render('login');
});
  
  module.exports = router;