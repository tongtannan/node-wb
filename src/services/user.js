/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:user数据库处理，格式化
 */
const { User } = require('../db/model/index');
const { formatUser } = require('./format');
const { addFollower } = require('./userRelation');

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

  const data = result.dataValues;
  addFollower(data.id, data.id);
  return data;
}

async function updateUser(updateData, { userName, password }) {
  const whereData = {
    userName
  };
  if (password) whereData.password = password;
  const res = await User.update(updateData, {
    where: whereData
  });
  return !!res.length;
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser
};
