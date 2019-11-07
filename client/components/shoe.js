import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentShoe} from '../store/shoe'
import {addToUserCart, getUserCart} from '../store/order'

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

  handleSubmit(event) {
    event.preventDefault()
    console.log(event.target.quantity.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.addToUserCart(
      this.props.user.id,
      Number(this.state.quantity),
      this.props.current.id
    )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
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

    return (
      <div className="one-shoe-container">
        <h3>{name}</h3>
        <img src={imageUrl} className="shoe-img" />
        <p>Product description:{description}</p>
        <p>Shoe type: {categories[category]}</p>
        <p>Price: {price} </p>

        <form onSubmit={this.handleSubmit}>
          <label>
            {' '}
            Quantity:
            <select
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            >
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
            <select
              name="size"
              onChange={this.handleChange}
              value={this.state.size}
            >
              <option value="noSize">select size</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>

          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //need to add shoeId
  return {
    current: state.shoe.current,
    user: state.user,
    cart: state.order.cart
  }
}

const mapDispatchToProps = dispatch => {
  //need to dispatch addToUserCart with userId, quantity, shoeId, name, price
  return {
    getCurrentShoe: id => dispatch(getCurrentShoe(id)),
    addToUserCart: (userId, quantity, shoeId) =>
      dispatch(addToUserCart(userId, quantity, shoeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoe)
