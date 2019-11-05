const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

// Admin route for getting all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//route for getting singleOrder, includinrg order items
router.get('/:orderId', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.orderId, {
      include: {model: OrderItem}
    })

    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})
