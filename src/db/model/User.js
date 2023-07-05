/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 用户模型
 */

const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  },
  nickName: {
    type: STRING,
    allowNull: false
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '1 男性，2 女性'
  },
  picture: {
    type: STRING
  },
  city: {
    type: STRING
  }
});

module.exports = User;
