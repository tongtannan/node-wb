/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 数据格式化
 */
const { DEFAULT_PICTURE } = require('../conf/constant');

function _formatUserPicture(obj) {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE;
  }

  return obj;
}

function formatUser(list) {
  if (!list) return;
  if (Array.isArray(list)) {
    return list.map(item => _formatUserPicture(item));
  }
  return _formatUserPicture(list);
}

module.exports = {
  formatUser
};
