import React from 'react'
import {connect} from 'react-redux'
import {removeFromUserCart} from '../store/order'

const Cart = ({user, isLoggedIn, cart, remove}) => {
  return cart.orderItems.length ? (
    <div className="shoe-container">
      {cart.orderItems.map(shoe => (
        <div key={shoe.id}>
          <h3>{shoe.name}</h3>
          <h4>${shoe.price}</h4>
          <img src={shoe.imageUrl} />
          <p />
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h3>There's nothing in your cart right now</h3>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  isLoggedIn: state.user.isLoggedIn,
  cart: state.order.cart
})

const mapDispatch = dispatch => ({
  remove: (userId, shoeId) => dispatch(removeFromUserCart(userId, shoeId))
})

export default connect(mapState, mapDispatch)(Cart)
