const router = require('express').Router();

const userRoutes = require('./user-Routes');
const blogpostsRoutes = require('./blogpost-Routes');

router.use('/users', userRoutes);
router.use('/blogposts', blogpostsRoutes);


module.exports = router;