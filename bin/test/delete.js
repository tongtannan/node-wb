const { Person, Doc } = require('./models');

async function deleteDoc() {
  const delDoc = await Doc.destroy({
    where: {
      id: 1
    }
  });

  process.exit()
}

deleteDoc();
