const User = require('./user')
const BlogPost = require('./blogpost')
const Comment = require('./comment')

//USER HAS MANY POSTS
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

//USER HAS MANY COMMENTS
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//BLOGPOST HAS MANY COMMENTS
BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
});
    
Comment.belongsTo(BlogPost, {
foreignKey: 'blogpost_id'
});

module.exports = { User, BlogPost, Comment };
