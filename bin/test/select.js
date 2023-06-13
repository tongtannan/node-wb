const { Person, Doc } = require('./models');

async function select() {
  //   const zhangsan = await Person.findOne({
  //     attributes: ['userName', 'nickName'],
  //     where: {
  //       userName: 'zhangsan'
  //     }
  //   });

  //   console.log(zhangsan.dataValues);

  //   const lisiDocList = await Doc.findAll({
  //     where: {
  //       userId: 2
  //     },
  //     order: [['id', 'asc']],
  //     limit: 2,
  //     offset: 0
  //   });

  //   连表查询，外表连主表
  //   const docListWithUser = await Doc.findAndCountAll({
  //     include: [
  //       {
  //         model: Person,
  //         attributes: ['userName', 'nickName']
  //       }
  //     ]
  //   });

  //   console.log(
  //     docListWithUser.count,
  //     docListWithUser.rows.map(blog => {
  //       const blogVal = blog.dataValues;
  //       blogVal.person = blogVal.person.dataValues;
  //       return blogVal;
  //     })
  //   );

  //   链表查询，主表连外表
  const userListWithBlog = await Person.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Doc
      }
    ]
  });
  console.log(
    userListWithBlog.count,
    userListWithBlog.rows.map(user => {
      const userVal = user.dataValues;
      userVal.docs = userVal.docs.map(doc => JSON.stringify(doc.dataValues));
      return userVal;
    })
  );
  //   console.log(userListWithBlog.rows[1].dataValues.docs[0].dataValues);

  //   console.log(lisiDocList.map(item => item.dataValues));

  //   const count = await Doc.findAndCountAll({
  //     where: {
  //       userId: 2
  //     }
  //   });

  //   console.log(count.count);

  process.exit();
}

select();
