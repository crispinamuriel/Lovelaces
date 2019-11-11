import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
//import {getCurrentCart} from '../store/Carts'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    console.log('in did mount')
    await this.props.getUserInfo()

    console.log('done awaiting')

    if (this.props.user.id) {
      console.log('in if')
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName
      })
    }
  }

  handleSubmit() {
    event.preventDefault()

    if (this.props.user.id) {
      console.log(this.props.user.id)
    }
    // cart function
    // Dont need to reset state, redirect to a different page
  }

  handleChange() {
    // update information on the state for the cart(thunk @ handleSubmit) to take in
    // such as size, quantity for specific cart item
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    //this.props.getCurrentCart(this.props.match.params.cartId)
  }

  render() {
    return (
      <div id="checkoutFullPage">
        <h2>Checkout</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Shipping Address:
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </label>
          {/* <label>
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
          </label> */}
          <button type="submit">Place Order</button>
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(me())
    //getCurrentCart: id => dispatch(getCurrentCart(id))
  }
}
export default Checkout
// export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
