const {
  User,
  Blog,
} = require('./model')

const date = Date.now();
// // 创建
(async () => {
  try {
    const zhangsan = await User.create({
      userName: '张三' + date,
      password: '123',
      nickName: '张三'
    })
    console.log(zhangsan.dataValues);
  } catch (error) {
    console.error(error);
  }
})();

(async () => {
  try {
    const blog1 = await Blog.create({
      userId: 1,
      content: '123',
      image: 'https://www.baidu.com/'
    })
    console.log(blog1.dataValues);
  } catch (error) {
    console.error(error);
  }
})();

// 更新
(async () => {
  try {
    const zhangsan = await User.update({
      userName: '李四' + date,
      nickName: '李四'
    }, {
      where: {
        id: 1
      }
    })
    console.log(zhangsan.dataValues);
  } catch (error) {
    console.error(error);
  }
})();

// 查询

(async () => {
  try {
    const zhangsan1 = await User.findOne({
      attributes: ['userName'],
      where: {
        id: 1
      }
    },
    )
    console.log(zhangsan1.dataValues);
    // 查询多个
    const zhangsanList = await User.findAll({
      attributes: ['userName', 'nickName'],
      where: {
        nickName: '张三'
      }
    })
    // 返回的是一个数组
    console.log(zhangsanList.map(user => user.dataValues));

    // 分页查询
    let lisiList = await User.findAll({
      attributes: ['id', 'userName', 'nickName'],
      limit: 2,
      offset: 2,
      order: [
        ['id', 'desc']
      ],
      where: {
        nickName: '李四'
      }
    })
    console.log(lisiList.map(user => user.dataValues));

    // 带count的查询
    lisiList = await User.findAndCountAll({
      attributes: ['id', 'userName', 'nickName'],
      limit: 2,
      offset: 2,
      order: [
        ['id', 'desc']
      ],
      where: {
        nickName: '李四'
      }
    })
    console.log(lisiList.count, lisiList.rows.map(user => user.dataValues));

    // 连表查询 根据Blog来查询 多对一
    const blogList = await Blog.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['userName', 'nickName'],
          where: {
            nickName: '李四'
          }
        }
      ]
    })
    console.log(blogList.count, blogList.rows.map(blog => ({
      ...blog.dataValues,
      user: blog.dataValues.user.dataValues
    })));

    // 根据User来查询 一对多
    const userList = await User.findAndCountAll({
      include: [
        {
          model: Blog,
        }
      ],
      where: {
        id: '1'
      }
    })
    console.log(userList.count, JSON.stringify(userList.rows.map(user => ({
      ...user.dataValues,
      blogs: user.blogs.map(blog => blog.dataValues)
    }))));

  } catch (error) {
    console.error(error);
  }
})();


(async () => {

  // 删除
  await Blog.destroy({
    where: {
      id: 1
    }
  });
})();