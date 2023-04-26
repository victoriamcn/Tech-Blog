const sequelize = require('../config/connection');
const seedUser = require('./userData.json');
const seedBlog = require('./blogData.json');
const seedComment = require('./commentData')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlog();

  await seedUser();

  await seedComment();

  process.exit(0);
};

seedAll();