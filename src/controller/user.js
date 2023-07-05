/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:user数据逻辑
 */
const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../models/ResModel');
const { REGISTER_USERNAME_EXIST } = require('../models/ErrorInfo');

async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (!userInfo) {
    return new SuccessModel({
      data: userInfo,
      message: '用户名可以使用'
    });
  } else {
    return new ErrorModel({
      errno: REGISTER_USERNAME_EXIST,
      message: '用户名已存在'
    });
  }
}

module.exports = {
  isExist
};
