import React, {Component} from 'react'
import {connect} from 'react-redux'
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
    // const categories = {
    //   1: 'Sneakers',
    //   2: 'Boots & Booties',
    //   3: 'Flip-Flops',
    //   4: 'Heels',
    //   5: 'Flats'
    // }
    // const {
    //   inventory,
    //   description,
    //   category,
    //   price,
    //   imageUrl,
    //   name
    // } = this.props.current

    return (
      <div id="checkoutFullPage">
        {console.log('hi')}
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
          <button type="submit">Checkout</button>
        </form>
      </div>
    )
  }
}
// quantity
// size
// add to cart button

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
