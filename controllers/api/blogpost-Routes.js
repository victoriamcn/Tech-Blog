const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

//CREATE New post
//api/users/
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

//DELETE
//api/users/blogpost/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!BlogPost) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(BlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
