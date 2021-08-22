const User = require('./User');
const Blog = require('./Blog');


// 这两种的查询方式不一样 在连表查询的时候
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Blog, {
  foreignKey: 'userId'
})


module.exports = {
  User,
  Blog
}
