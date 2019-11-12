const router = require('express').Router()
const {Order, OrderItem, Shoe, User} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

//Route for getting all orders for a specific user, not including cart
router.get('/user-orders/:userId', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {userId: req.params.userId, status: {[Op.not]: 'In cart'}},
      include: {model: OrderItem, include: {model: Shoe}}
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})

//Route for getting cart for a specific user, including cart items
router.get('/user-cart/:userId', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {userId: req.params.userId, status: {[Op.eq]: 'In cart'}},
      include: {model: OrderItem, include: {model: Shoe}}
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

//Route for adding an item to cart
router.post('/user-cart/:userId', async (req, res, next) => {
  try {
    const quantity = req.body.quantity
    const shoe = await Shoe.findByPk(req.body.shoeId)

    //Check if the cart exists. If it doesn't, create the cart on the orders table
    const [cart, created] = await Order.findOrCreate({
      where: {userId: req.user.id, status: {[Op.eq]: 'In cart'}},
      defaults: {
        userId: req.params.userId,
        status: 'In cart',
        total: shoe.price * quantity
      }
    })

    //To add the shoe to the OrderItem table, first check if the shoe is already on the table or not
    const orderItem = await OrderItem.findOne({
      where: {shoeId: shoe.id, orderId: cart.id}
    })

    //If the orderItem for that shoe already exists, update the quantity
    if (orderItem) {
      await orderItem.update({quantity: orderItem.quantity + quantity})
    } else {
      //Else add that shoe as an orderItem
      await cart.addShoe(shoe, {through: {quantity: quantity}})
    }

    const updatedCart = await Order.findByPk(cart.id, {
      include: {model: OrderItem, include: {model: Shoe}}
    })

    //If the cart wasn't created, update the total
    if (!created) {
      const oldTotal = updatedCart.total
      await updatedCart.update({total: oldTotal + shoe.price * quantity})
    }

    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

//Route for removing an item from cart
router.delete('/user-cart/:userId', async (req, res, next) => {
  console.log(req.body)
  try {
    //Find the cart for that specfic user
    let cart = await Order.findOne({
      where: {userId: req.params.userId, status: {[Op.eq]: 'In cart'}}
    })

    //Find the shoe you're trying to remove
    const orderItem = await OrderItem.findOne({
      where: {shoeId: req.body.shoeId, orderId: cart.id},
      include: {model: Shoe}
    })

    //Calculate the new total
    const newTotal = cart.total - orderItem.shoe.price * orderItem.quantity

    //Update the cart total
    await Order.update(
      {total: newTotal},
      {
        where: {userId: req.params.userId, status: {[Op.eq]: 'In cart'}},
        returning: true
      }
    )

    //Destroy the cart item for the show we're removing
    await OrderItem.destroy({
      where: {shoeId: req.body.shoeId, orderId: cart.id}
    })

    const updatedCart = await Order.findOne({
      where: {userId: req.params.userId, status: {[Op.eq]: 'In cart'}},
      include: {model: OrderItem, include: {model: Shoe}}
    })

    //Send back the updated cart
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

//Route for updating quantities for an item in cart

//Route for submitting an order for a logged in user
router.patch('/user-cart/checkout/:userId', async (req, res, next) => {
  try {
    const order = await Order.update(
      {status: 'Received', address: req.body.address},
      {where: {userId: req.params.userId, status: 'In cart'}}
    )
    if (!order) return res.sendStatus(204)
    res.status(200).send({orderItems: []})
  } catch (err) {
    next(err)
  }
})

//Route for getting guest cart
router.get('/guest-cart', (req, res, next) => {
  // console.log('SHOW SESSION above try', req.session.cart)
  try {
    if (!req.session.cart) {
      req.session.cart = {
        address: null,
        status: 'In cart',
        total: 0,
        orderItems: []
      }
    }
    // console.log('SHOW THE SESSION',req.session.cart)
    res.send(req.session.cart)
  } catch (err) {
    next(err)
  }
})

//Route for adding an item to guest cart
router.post('/guest-cart', async (req, res, next) => {
  try {
    const quantity = req.body.quantity
    const shoe = await Shoe.findByPk(req.body.shoeId)
    const cart = req.session.cart

    //If they already have a cart on session, do this
    if (cart) {
      //Search for the shoe in the existing orderItems
      const indexOfTargetOrderItem = cart.orderItems.findIndex(
        orderItem => orderItem.shoeId === shoe.id
      )

      //If the shoe is in the orderItems, update the quantity
      if (indexOfTargetOrderItem > -1) {
        cart.orderItems[indexOfTargetOrderItem].quantity += quantity
      } else {
        //If not, add it to orderItems
        cart.orderItems = [
          ...cart.orderItems,
          {quantity, shoeId: shoe.id, shoe: shoe}
        ]
      }
      cart.total += shoe.price * quantity
    } else {
      //If they don't have a cart, create one
      req.session.cart = {
        address: null,
        status: 'In cart',
        total: shoe.price * quantity,
        orderItems: [{quantity, shoeId: shoe.id, shoe}]
      }
    }

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//Route for removing an item from guest cart
router.delete('/guest-cart', async (req, res, next) => {
  try {
    const shoe = await Shoe.findByPk(req.body.shoeId)
    const cart = req.session.cart

    //Find the index of the order item for the shoe
    const indexOfTargetOrderItem = cart.orderItems.findIndex(
      orderItem => orderItem.shoeId === shoe.id
    )

    const targetOrderItem = cart.orderItems[indexOfTargetOrderItem]

    //Update the total
    cart.total -= targetOrderItem.quantity * shoe.price

    //Remove targetOrderItem from orderItems
    cart.orderItems.splice(indexOfTargetOrderItem, 1)

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// Route for submitting an order from a guest cart
router.patch('/guest-cart', async (req, res, next) => {
  try {
    const order = await Order.create({
      address: req.body.address,
      status: 'Received',
      total: req.session.cart.total
    })
    const items = []
    for (let i = 0; i < req.session.cart.orderItems; i++) {
      const sessionInfo = req.session.cart.orderItems[i]
      const cartItem = {
        orderId: order.id,
        quantity: sessionInfo.quantity,
        shoeId: sessionInfo.shoeId
      }
      items.push(cartItem)
    }

    await OrderItem.bulkCreate(items)

    req.session.cart = {
      address: null,
      status: 'In cart',
      total: 0,
      orderItems: []
    }

    res.status(200).send(req.session.cart)
  } catch (err) {
    next(err)
  }
})

// Route for getting all orders, not including carts
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        status: {
          [Op.not]: 'In cart'
        }
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//Route for getting single order, including order items
router.get('/:orderId', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.orderId, {
      include: {model: OrderItem, include: {model: Shoe}}
    })

    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})
