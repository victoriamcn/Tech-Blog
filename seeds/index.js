const sequelize = require('../config/connection');
const { User, Comment, BlogPost } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogData.json');
const commentData = require('./commentData.json')

const seedAll = async () => {
  await sequelize.sync({ force: true });

//   const users = 
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

//   for (const project of projectData) {
//     await Project.create({
//       ...project,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

  process.exit(0);
};

seedAll();