const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// HOMEPAGE GET REQUEST

router.get('/', async (req, res) => {
    try {
      // Get all blog posts and JOIN with user data
      const blogpostData = await BlogPost.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
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
  });

  // GET one blogpost with id
router.get('/blogpost/:id', withAuth, async (req, res) => {
    try {
      const blogpostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: comment,
            attributes: [
              'id',
              'comment',
              'date_created',
              'user_id',
              'blogpost_id',
            ],
          },
        ],
      });
      const specificBlogPosts = BlogPost.get({ plain: true });
      res.render('blogposts', { specificBlogPosts, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;