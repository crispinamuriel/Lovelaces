import React, {Component} from 'react'
import {connect} from 'react-redux'
import Cart from './cart'
//import {getCurrentCart} from '../store/Carts'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: '',
      size: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    event.preventDefault()
    // cart function
    // Dont need to reset state, redirect to a different page
  }

  handleChange() {
    // update information on the state for the cart(thunk @ handleSubmit) to take in
    // such as size, quantity for specific cart item
  }

  componentDidMount() {
    //this.props.getCurrentCart(this.props.match.params.cartId)
  }

  render() {
    return (
      <div id="checkoutFullPage">
        <div id="form">
          <h2>Checkout</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Shipping Address:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Credit Card Number:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Billing Address:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <button id="add-to-cart" type="submit">
              Submit Order
            </button>
          </form>
        </div>
        <div id="cart">
          <Cart />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    current: state.cart.current
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //getCurrentCart: id => dispatch(getCurrentCart(id))
  }
}
export default Checkout
// export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
