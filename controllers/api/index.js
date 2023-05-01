const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogpostsRoutes = require('./blogpost-Routes');

router.use('/users', userRoutes);
router.use('/blogposts', blogpostsRoutes);


module.exports = router;