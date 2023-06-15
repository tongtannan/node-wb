/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: delete
 */
const { Person, Doc } = require('./models');

async function deleteDoc() {
  const delDoc = await Doc.destroy({
    where: {
      id: 1
    }
  });

  process.exit();
}

deleteDoc();
