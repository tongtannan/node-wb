/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: db、redis
 */
const { isDev } = require('../utils/env');

let REDIS_CONF;
let MYSQL_CONF;
// 判断线上环境还是线下环境
if (isDev) {
  REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1'
  };
  MYSQL_CONF = {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    password: 'ttn456456',
    prot: '3306',
    database: 'koa2_weibo_db'
  };
} else {
  REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1'
  };
  MYSQL_CONF = {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    password: 'ttn456456',
    prot: '3306',
    database: 'koa2_weibo_db'
  };
}

module.exports = { REDIS_CONF, MYSQL_CONF };
