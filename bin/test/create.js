const { Person, Doc } = require('./models');

async function createPerson() {
  const lisi = await Person.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四'
  });

  const id = lisi.dataValues.id;

  const doc = await Doc.create({
    title: '标题2',
    content: '内容2',
    userId: id
  });
}

createPerson();
