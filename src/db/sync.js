/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 数据库测试
 */
const seq = require('./seq');

require('./model/index');

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('ok');
  })
  .catch(() => {
    console.log('error');
  });

// 执行同步
seq
  .sync({
    force: true
  })
  .then(() => {
    console.log('sync ok');
    process.exit();
  });
