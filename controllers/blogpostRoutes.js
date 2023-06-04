const router = require('express').Router();
const { BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// POST: /blogpost
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
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
          model: User, // Add the correct model to include here
          attributes: ['username'],
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


//DELETE: /blogpost/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
