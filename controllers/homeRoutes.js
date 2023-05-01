const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// // GET ALL USERS
// router.get("/", async (req, res)=>{
//   try {
//     const getUsers = await User.findAll()
//     const realData = getUsers.map((user)=>user.get({plain:true}))
//     //an array of all users
//     console.log(realData)
//     res.render("homepage", {
//       realData
//     })
//   } catch (e){
//     console.log(e);
//     res.status(500).json(e)
//  }
// })

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
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        blogPosts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
    console.log("Homepage GET Request")
  });

// GET one blogpost with id
router.get('/blogpost/:id', withAuth, async (req, res) => {
    try {
      const blogpostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'comment',
              'date_created',
              'user_id',
              'blogpost_id',
            ],
          },
          {
            mode
          }
        ],
      });
      const specificBlogPosts = blogpostData.get({ plain: true });
      res.render('blogposts', { specificBlogPosts, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    console.log("Blogpost by id GET Request")
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
  res.render('login');
  console.log("Login GET Request")
});
  
  module.exports = router;