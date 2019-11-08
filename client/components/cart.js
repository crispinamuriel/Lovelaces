import React, {Component} from 'react'
import {connect} from 'react-redux'
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

    if (this.props.isLoggedIn) {
      this.props.getUserCart(this.props.user.id)
    } else {
      this.props.getUserCart(null)
    }
  }

  render() {
    const {user, isLoggedIn, cart, remove} = this.props
    console.log('WHATS IN THE CART', cart.orderItems)

    return cart.orderItems.length ? (
      <div className="shoe-container">
        {cart.orderItems.map(orderItem => {
          const shoe = orderItem.shoe
          return (
            <div key={shoe.id}>
              <h3>{shoe.name}</h3>
              <h4>${shoe.price}</h4>
              <img src={shoe.imageUrl} />
              <p />
            </div>
          )
        })}
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
  isLoggedIn: state.user.isLoggedIn,
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
