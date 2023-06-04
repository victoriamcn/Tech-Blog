const router = require('express').Router();

const homeRoutes = require("./homeRoutes");
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const blogpostRoutes = require('./blogpostRoutes');

router.use("/", homeRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/blogposts', blogpostRoutes);

module.exports = router;