const router = require('express').Router()
const {Shoe} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const shoes = Shoe.findAll()
    res.json(shoes)
  } catch (error) {
    next(error)
  }
})
