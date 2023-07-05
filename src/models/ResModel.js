/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: Response的数据模型
 */

class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno;
    if (data) this.data = data;
    if (message) this.message = message;
  }
}

class SuccessModel extends BaseModel {
  constructor({ data = {}, message = '' }) {
    super({
      errno: 0,
      data,
      message
    });
  }
}

class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};
