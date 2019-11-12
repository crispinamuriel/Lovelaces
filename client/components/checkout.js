import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {placeOrder} from '../store/order'

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
    await this.props.getUserInfo()

    if (this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        address: this.props.user.address
      })
    }
  }

  handleSubmit() {
    event.preventDefault()

    this.props.user.id
      ? this.props.placeOrder(this.props.user.id, this.state.address)
      : this.props.placeOrder(null, this.state.address)

    this.props.history.push('/success')
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
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
          <button type="submit">Place Order</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(me()),
    placeOrder: (userId, address) => dispatch(placeOrder(userId, address))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
