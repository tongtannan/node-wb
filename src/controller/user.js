/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:user业务逻辑，返回格式
 */
const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../models/ResModel');
const {
  registerUserNameExistInfo,
  registerFailInfo
} = require('../models/ErrorInfo');
const doCrypto = require('../utils/crypto');

async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (!userInfo) {
    return new SuccessModel({
      data: userInfo,
      message: '用户名可以使用'
    });
  } else {
    return new ErrorModel(registerUserNameExistInfo);
  }
}

async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }

  try {
    const res = await createUser({
      userName,
      password: doCrypto(password),
      gender
    });

    return new SuccessModel({
      data: res,
      message: '注册成功'
    });
  } catch (error) {
    return new ErrorModel(registerFailInfo);
  }
}

module.exports = {
  isExist,
  register
};
