/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: model
 */
const { DataTypes } = require('sequelize');
const seq = require('../seq');

const Person = seq.define('person', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nickName: {
    type: DataTypes.STRING
  }
});

const Doc = seq.define('doc', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
/**
 * @description: 外键
 */
Doc.belongsTo(Person, {
  foreignKey: 'userId'
});
Person.hasMany(Doc, {
  foreignKey: 'userId'
});

module.exports = {
  Person,
  Doc
};
