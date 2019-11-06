const User = require('./user')
const Shoe = require('./shoe')
const Order = require('./order')
const OrderItem = require('./orderItem')
const Cart = require('./cart')
const CartItem = require('./cartItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//Order associations
User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

OrderItem.belongsTo(Shoe)

//Cart associations
User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

CartItem.belongsTo(Shoe)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Shoe,
  Order,
  OrderItem,
  Cart,
  CartItem
}
