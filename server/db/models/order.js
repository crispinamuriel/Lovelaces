const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: Sequelize.STRING,
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['In cart', 'Received', 'In progress', 'Complete', null]]
    }
  },
  total: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
