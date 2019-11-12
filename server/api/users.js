const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId)
    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})

router.patch('/:userId', async (req, res, next) => {
  try {
    const user = await User.update(req.body, {where: {id: req.params.userId}})
    if (!user) return res.sendStatus(204)
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
})
