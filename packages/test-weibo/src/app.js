
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const glob = require('glob')
const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')


// 错误处理
onerror(app)

// middlewares
// 处理post请求
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

// 处理日志
app.use(logger())


// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 单位 ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

// 添加ctx.render方法 处理ejs
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// 测试的中间件demo
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// 实现路由的自动加载
glob('/routes/**/*.js', {
  cwd: __dirname,
  root: __dirname
}, (err, files) => {
  if (err) {
    console.error(err)
    process.exit()
  }
  files.forEach(routerPath => {
    const router = require(routerPath)
    app.use(router.routes(), router.allowedMethods())
  })
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
