/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:db
 */
const Sequelize = require('sequelize');
const seq = new Sequelize('koa2_weibo_db', 'root', 'ttn456456', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5, // 连接池最大数量
    min: 0,
    idle: 1000 * 10 // 如果一个连接池10s以内没有被使用，则释放
  }
});
/**
 * @description: redis
 */
let REDIS_CONF = {
  post: 6379,
  host: '127.0.0.1'
};

seq
  .authenticate()
  .then(() => {
    console.log('ok');
  })
  .catch(() => {
    console.log('error');
  });

module.exports = seq;
