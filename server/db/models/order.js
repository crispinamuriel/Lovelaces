const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: Sequelize.STRING,
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Received', 'In progress', 'Complete', null]]
    }
  },
  total: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Order
