const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const cartItem = await CartItem.create(req.body)
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartItemId', async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: {
        id: req.params.cartItemId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.patch('/:cartItemId', async (req, res, next) => {
  try {
    const cartItem = await CartItem.update(req.body, {
      where: {id: req.params.cartItemId}
    })
    if (!cartItem) return res.sendStatus(404)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
