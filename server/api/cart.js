const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')
module.exports = router

// Admin route for getting all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Cart.findAll({})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//route for getting a single cart, including cart items
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.userId, {
      include: {model: CartItem}
    })

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const [cart, created] = await Cart.findOrCreate({
      where: {userId: req.params.userId},
      defaults: req.body
    })

    if (!created) {
      await cart.update(req.body)
    }

    res.json(cart)
  } catch (err) {
    next(err)
  }
})
