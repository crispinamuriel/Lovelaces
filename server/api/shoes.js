const router = require('express').Router()
const {Shoe} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const shoes = await Shoe.findAll()
    res.json(shoes)
  } catch (error) {
    next(error)
  }
})

router.get('/:shoeId', async (req, res, next) => {
  try {
    const singleShoe = await Shoe.findByPk(req.params.shoeId)
    res.json(singleShoe)
  } catch (error) {
    next(error)
  }
})

router.get('/category/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (id === 0) {
      console.log('in if statement')
      const shoes = await Shoe.findAll()
      res.json(shoes)
    } else {
      const shoes = await Shoe.findAll({
        where: {
          category: id
        }
      })
      res.json(shoes)
    }
  } catch (error) {
    next(error)
  }
})
