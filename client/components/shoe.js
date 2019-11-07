import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentShoe} from '../store/shoe'

class Shoe extends Component {
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
    this.props.getCurrentShoe(this.props.match.params.shoeId)
  }

  render() {
    const categories = {
      1: 'Sneakers',
      2: 'Boots & Booties',
      3: 'Flip-Flops',
      4: 'Heels',
      5: 'Flats'
    }
    const {
      inventory,
      description,
      category,
      price,
      imageUrl,
      name
    } = this.props.current

    console.log('SINGLE SHOE COMPONENT PROPS', this.props)
    return (
      <div id="shoeFullPage">
        <h1>{name}</h1>
        <p>Product description:{description}</p>
        <p>Shoe type: {categories[category]}</p>
        <p>Price: {price} </p>

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

          <button type="submit">Add to Cart</button>
        </form>

        <img src={imageUrl} />
      </div>
    )
  }
}
// quantity
// size
// add to cart button

const mapStateToProps = state => {
  return {
    current: state.shoe.current
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentShoe: id => dispatch(getCurrentShoe(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoe)

// This can replace the manual options drop-down menu
// This will map through an "options" variable that will be the max inventory number for a specific shoe, this will depend on how we get the inventory information about the shoe from the store

{
  /* {options.map((option, index) => (
              <option value={`${index + 1}`}>{index+1}</option>
            ))} */
}

// this can be copy/pasted into mapDispatchToProps, but the thunks themselves are not written yet. Very similar to goody bag

// THUNK FOR INCREASING QUANITITY OF SPECIFIC ORDER ITEM
// increaseQuantity: (id) => dispatch(increaseQuantity(id)),
// thunk not written yet

// THUNK FOR DECREASING QUANITITY OF SPECIFIC ORDER ITEM
// decreaseQuantity: (id) => dispatch(decreaseQuantity(id))
// t
