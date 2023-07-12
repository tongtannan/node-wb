/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:
 */
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const index = require('./routes/index');
const users = require('./routes/api/users');
const blogHome = require('./routes/api/blog');
const userRelation = require('./routes/api/userRelation');
const atRelation = require('./routes/api/atRelation');
const { SESSION_SECRET_KEY } = require('./conf/secretKeys');
const { REDIS_CONF } = require('./conf/db');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
);

app.keys = SESSION_SECRET_KEY;
app.use(
  session({
    // cookie的name 默认是 koa.sid
    key: 'weibo.sid',
    // redis key 的前缀 默认是 koa.sess
    prefix: 'weibo:sess:',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.prot}`
    })
  })
);

// logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(blogHome.routes(), blogHome.allowedMethods());
app.use(userRelation.routes(), userRelation.allowedMethods());
app.use(atRelation.routes(), atRelation.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
