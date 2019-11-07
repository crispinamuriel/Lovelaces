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
        {/* <h1>{name}</h1>
        <p>Product description:{description}</p>
        <p>checkout type: {categories[category]}</p>
        <p>Price: {price} </p> */}

        <form onSubmit={this.handleSubmit}>
          <label>
            {' '}
            Quantity:
            <select>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>

          <label>
            {' '}
            Size:
            <select>
              <option value="noSize">select size</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>

          <button type="submit">Checkout</button>
        </form>

        {/* <img src={imageUrl} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
