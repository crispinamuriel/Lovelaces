const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: Sequelize.INTEGER
})

module.exports = OrderItem
