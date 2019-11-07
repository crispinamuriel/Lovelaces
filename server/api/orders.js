const router = require('express').Router()
const {Order, OrderItem, Shoe} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

//Helper function for updating cart total
// async function updateTotal (shoeId, quantity, userId) {
//   try {

//   } catch (err) {
//     cons
//   }
// }

//Route for getting all orders for a specific user, not including cart
router.get('/user-orders/:userId', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {userId: req.params.userId, status: {[Op.not]: 'In cart'}},
      include: {model: OrderItem}
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
      include: {model: OrderItem}
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
      include: {model: OrderItem}
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

//Route for adding an order

//Route for removing an item from cart
router.delete('/user-cart/:userId', async (req, res, next) => {
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
      include: {model: OrderItem}
    })

    //Send back the updated cart
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

//Route for updating quantities for an item in cart

//Route for getting guest cart
router.get('/guest-cart', (req, res, next) => {
  try {
    res.json(req.session.cart)
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
      const indexOfTargetOrderItem = cart.orderItems.findIndex(
        orderItem => orderItem.shoeId === shoe.id
      )
      if (indexOfTargetOrderItem > -1) {
        cart.orderItems[indexOfTargetOrderItem].quantity += quantity
      } else {
        cart.orderItems = [...cart.orderItems, {quantity, shoeId: shoe.id}]
      }
      cart.total += shoe.price * quantity
    } else {
      //If they
      req.session.cart = {
        address: null,
        status: 'In cart',
        total: shoe.price * quantity,
        orderItems: [{quantity, shoeId: shoe.id}]
      }
    }

    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/guest-cart', async (req, res, next) => {
  try {
    const shoeId = req.body.shoeId
    const shoe = await Shoe.findByPk(req.body.shoeId)
    const cart = req.session.cart
  } catch (err) {
    next(err)
  }
})

//Route for getting all orders, not including carts
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
      include: {model: OrderItem}
    })

    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})
