import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromUserCart, getUserCart} from '../store/order'
import {me} from '../store'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit() {
    // needs same thnks for updating as in single shoe page
    // redirect to checkout page
  }

  handleChange() {
    // update state with changed information
  }

  async componentDidMount() {
    // bring the order info, w/ thunk from mapDispatch

    await this.props.getUserInfo()

    if (this.props.user.id) {
      this.props.getUserCart(this.props.user.id)
    } else {
      this.props.getUserCart(null)
    }
  }

  render() {
    const {cart, remove, user} = this.props

    return cart.orderItems.length ? (
      <div className="shoe-container">
        {cart.orderItems.map(orderItem => {
          console.log(orderItem)
          const shoe = orderItem.shoe
          return (
            <div key={shoe.id}>
              <Link to={`/all-shoes/${shoe.id}`}>
                <h3>{shoe.name}</h3>
                <h4>${(shoe.price / 100).toFixed(2)}</h4>
                <h4>Quantity: {orderItem.quantity}</h4>
                <img src={shoe.imageUrl} />
              </Link>
              <button
                onClick={() => {
                  remove(user.id, orderItem.shoeId)
                }}
              >
                Remove
              </button>
            </div>
          )
        })}
        <h3>Total Price: {cart.total}</h3>
      </div>
    ) : (
      <div>
        <h3>There's nothing in your cart right now</h3>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.order.cart
})

const mapDispatch = dispatch => ({
  remove: (userId, shoeId) => dispatch(removeFromUserCart(userId, shoeId)),
  getUserCart: userId => dispatch(getUserCart(userId)),
  getUserInfo: () => dispatch(me())
  // the thunk that brings me the order items
})

export default connect(mapState, mapDispatch)(Cart)

// write a route for updating guest & logged in cart
