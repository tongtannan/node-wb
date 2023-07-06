/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: user view、API接口、校验
 */
const router = require('koa-router')();
const { isExist, register } = require('../../controller/user');
const userValidator = require('../../validator/user');
const { genValidator } = require('../../middlewares/validarot');
const test = require('../../middlewares/test');

router.prefix('/api/user');

router.post(
  '/register',
  test(),
  genValidator(userValidator),
  async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body;

    ctx.body = await register({
      userName,
      password,
      gender
    });
  }
);

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  // controller
  ctx.body = await isExist(userName);
});

module.exports = router;
