const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');
const AtRelation = require('./AtRelation');

// 查询Blog带出User
Blog.belongsTo(User, {
  foreignKey: 'userId'
});

// User.hasMany(Blog, {
//   sourceKey: 'id',
//   foreignKey: 'userId'
// });

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
});

User.hasMany(UserRelation, {
  foreignKey: 'userId'
});

Blog.belongsTo(UserRelation, {
  sourceKey: 'followerId',
  targetKey: 'followerId',
  foreignKey: 'userId'
});

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
});

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
};
