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

  process.exit()
}

update();
