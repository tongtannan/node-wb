/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: user view、API接口、校验
 */
const router = require('koa-router')();
const {
  isExist,
  register,
  login,
  updateInfo,
  updatePassword,
  logout
} = require('../../controller/user');
const { getFollowers } = require('../../controller/userRelation');
const { userValidate, updateUserValidate } = require('../../validator/user');
const { genValidator } = require('../../middlewares/validarot');
const { loginCheck } = require('../../middlewares/loginChecks');
const test = require('../../middlewares/test');

router.prefix('/api/user');

router.post(
  '/register',
  test(),
  genValidator(userValidate),
  async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body;

    ctx.body = await register({
      userName,
      password,
      gender
    });
  }
);

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
});

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;

  ctx.body = await isExist(userName);
});

router.post(
  '/updateInfo',
  loginCheck,
  genValidator(updateUserValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body;
    ctx.body = await updateInfo(ctx, {
      nickName,
      city,
      picture
    });
  }
);

router.post(
  '/updatePassword',
  loginCheck,
  genValidator(updateUserValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    ctx.body = await updatePassword(userName, password, newPassword);
  }
);

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx);
});

// 获取关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  ctx.body = await getFollowers(userId);
});

module.exports = router;
