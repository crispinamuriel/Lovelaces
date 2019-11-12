import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentShoe} from '../store/shoe'
import {addToUserCart} from '../store/order'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  TextField
} from '@material-ui/core'

import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
  ShoppingCart
} from '@material-ui/icons'

const styles = {
  card: {
    maxWidth: 500
  },
  media: {
    // objectFit: 'cover',
    height: 250
  }
}
class Shoe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      size: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()

    this.setState({
      [event.target.name]: event.target.value
    })

    await this.props.addToUserCart(
      this.props.user.id,
      Number(this.state.quantity),
      this.props.current.id
    )

    this.props.history.push('/cart')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  increase() {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1
    }))
  }

  // increase() {
  //   this.setState(prevState => {
  //     if(prevState.quantity < this.props.current.inventory) {
  //       return {
  //         quantity: prevState.quantity + 1
  //       }
  //     } else {
  //       return ;
  //     }
  //   });
  // }

  decrease() {
    this.setState(prevState => ({
      quantity: prevState.quantity - 1
    }))
  }

  // decrease() {
  //   this.setState(prevState => {
  //     if(prevState.quantity > 0 ) {
  //       return {
  //         quantity: prevState.quantity + 1
  //       }
  //     } else {
  //       return ;
  //     }
  //   });
  // }

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

    const disabledIncrease = this.state.quantity === inventory
    const disabledDecrease = this.state.quantity === 0

    return (
      <Card className="entire-shoe">
        <CardMedia
          className="shoe-media"
          component="img"
          img={imageUrl}
          alt={`${name} image`}
          title={`${name} image`}
        />

        <CardContent className="shoe-details">
          <Typography component="h3" variant="h3">
            {name}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            Shoe type: {categories[category]}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            Price:{'$' + (price / 100).toFixed(2)}{' '}
          </Typography>

          <Typography variant="subtitle1"> Product details: </Typography>

          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
        </CardContent>

        <div id="buy-container">
          <form
            className="purchase-area"
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              select
              name="size"
              onChange={this.handleChange}
              value={this.state.size}
              helperText="Select size"
            >
              <option value="noSize">select size</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </TextField>

            <TextField
              select
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            >
              <Typography variant="h5" gutterBottom>
                {this.state.quantity}
              </Typography>
            </TextField>

            <CardActions>
              <IconButton
                size="small"
                color="primary"
                disabled={disabledDecrease}
                onClick={this.decrease}
              >
                <RemoveCircleOutlineRounded />
              </IconButton>

              <Typography variant="body1" color="textSecondary">
                Quantity: {this.state.quantity}
              </Typography>

              <IconButton
                size="small"
                color="primary"
                disabled={disabledIncrease}
                onClick={this.increase}
              >
                <AddCircleOutlineRounded />
              </IconButton>

              <Button
                id="add-to-cart"
                type="submit"
                size="large"
                startIcon={<ShoppingCart />}
              >
                Add to Cart
              </Button>
            </CardActions>
          </form>
        </div>
      </Card>
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
