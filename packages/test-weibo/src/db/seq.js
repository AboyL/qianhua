const Sequelize = require('sequelize')
const config = require('../conf/db').MYSQL_CONF


const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  // 连接池
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

module.exports = sequelize