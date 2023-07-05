/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:user相关接口
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

module.exports = {
  getUserInfo
};
