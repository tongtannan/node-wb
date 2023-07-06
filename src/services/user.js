/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:user数据库处理，格式化
 */
const { User } = require('../db/model/index');
const { formatUser } = require('./format');

async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  };
  if (password) whereOpt.password = password;

  const res = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  });
  if (res === null) return res;

  return formatUser(res.dataValues);
}

async function createUser({
  userName,
  password,
  gender = 3,
  nickName = userName
}) {
  const result = await User.create({
    userName,
    password,
    nickName,
    gender
  });

  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser
};
