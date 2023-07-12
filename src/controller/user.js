/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:user业务逻辑，返回格式
 */
const { getUserInfo, createUser, updateUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../models/ResModel');
const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
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

async function login(ctx, userName, password) {
  // ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(password));

  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }
  ctx.session.userInfo = userInfo;
  //   if (!ctx.session.userInfo) ctx.session.userInfo = userInfo;
  return new SuccessModel({
    data: userInfo,
    message: '登录成功'
  });
}

async function updateInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) nickName = userName;
  const res = await updateUser(
    {
      nickName,
      city,
      picture
    },
    { userName }
  );
  if (res) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    });
    return new SuccessModel({
      data: ctx.session.userInfo,
      message: '修改成功'
    });
  } else {
    return new ErrorModel(changeInfoFailInfo);
  }
}

async function updatePassword(userName, password, newPassword) {
  const res = await updateUser(
    { password: doCrypto(newPassword) },
    {
      userName,
      password: doCrypto(password)
    }
  );
  if (res) {
    return new SuccessModel({
      message: '修改成功'
    });
  } else {
    return new ErrorModel(changePasswordFailInfo);
  }
}

async function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel({
    message: '成功退出登录'
  });
}

module.exports = {
  isExist,
  register,
  login,
  updateInfo,
  updatePassword,
  logout
};
