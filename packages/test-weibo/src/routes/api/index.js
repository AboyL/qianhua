const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 返回页面
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  if (!ctx.session.view) {
    ctx.session.view = 0
  }
  console.log(ctx.cookie)
  ++ctx.session.view
  ctx.body = {
    title: 'koa2 string',
    view: ctx.session.view
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
