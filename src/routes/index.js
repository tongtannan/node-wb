/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:
 */
const router = require('koa-router')();
const { loginRedirect, loginCheck } = require('../middlewares/loginChecks');

router.get('/json', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
});

router.get('/check', loginCheck, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
});

router.get('/profile/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: 'title',
    userName,
    pageIndex
  };
});

module.exports = router;
