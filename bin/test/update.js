/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: update
 */
const { Person, Doc } = require('./models');

async function update() {
  const updateRes = await Person.update(
    {
      nickName: 'update'
    },
    {
      where: {
        nickName: '张三'
      }
    }
  );

  process.exit();
}

update();
