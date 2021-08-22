const redis = require('redis')
const { promisify } = require("util");

const REDIS_CONF = {
  // 线上的 redis 配置
  port: 6379,
  host: '127.0.0.1'
}

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error', err)
})
redisClient.on('connect', () => {
  console.log('ready connect');
})
const getAsync = promisify(redisClient.get).bind(redisClient);

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s
 */
function set (key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 键
 */
async function get (key) {
  const res = await getAsync(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}

set('test', 'test')
set('test2', { test: 1, test: 2 })

get('test').then(res => {
  console.log('test', res);
})
get('test2').then(res => {
  console.log('test2', res);
})

module.exports = {
  set,
  get
}
