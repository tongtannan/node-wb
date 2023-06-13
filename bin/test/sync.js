/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 
 */
const seq = require('../seq');

require('./models');

seq
  .sync({
    force: true // 清空数据库
  })
  .then(() => {
    console.log('sync ok');
    process.exit();
  });
