import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentShoe} from '../store/shoe'
import {addToUserCart} from '../store/order'
import {
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Toolbar,
  Divider,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'

const style = {
  card: {
    maxWidth: 500
  },
  media: {
    objectFit: 'contain',
    width: 325
  },
  paper: {
    marginBottom: 20,
    marginTop: 20,
    maxWidth: 750,
    minWidth: 600,
    padding: 25
  },
  detailsContainer: {
    marginTop: 20
  },
  shoeInfoPaper: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 350,
    minWidth: 350
  },
  input: {minWidth: 120, maxWidth: 120},
  inputLabel: {fontSize: '.75rem'},
  price: {marginTop: 10}
}
class Shoe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      size: 6
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  componentDidMount() {
    this.props.getCurrentShoe(this.props.match.params.shoeId)
  }

  render() {
    console.log(this.state)

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

    const max = inventory >= 10 ? 10 : inventory

    return (
      <Grid container justify="center">
        <Paper style={style.paper}>
          <Toolbar>
            <Typography variant="h6">{name}</Typography>
          </Toolbar>
          <Divider variant="middle" />
          <Grid
            container
            spacing={4}
            justify="center"
            style={style.detailsContainer}
          >
            <Grid item>
              <img src={imageUrl} style={style.media} />
            </Grid>
            <Grid item>
              <Paper style={style.shoeInfoPaper}>
                <Typography variant="body2">{description}</Typography>
                <Typography variant="body2" style={style.price}>
                  ${(price / 100).toFixed(2)}
                </Typography>
                <form onSubmit={this.handleSubmit}>
                  <div
                    style={{display: 'flex', justifyContent: 'space-evenly'}}
                  >
                    <div>
                      <InputLabel id="size" style={style.inputLabel}>
                        Size
                      </InputLabel>
                      <Select
                        labelId="size"
                        value={this.state.size}
                        onChange={this.handleChange}
                        name="size"
                        style={style.input}
                      >
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </div>

                    <div>
                      <InputLabel id="quantity" style={style.inputLabel}>
                        Quantity
                      </InputLabel>
                      <TextField
                        labelId="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}
                        name="quantity"
                        type="number"
                        inputProps={{
                          min: 1,
                          max: max,
                          step: 1
                        }}
                        style={style.input}
                      />
                    </div>
                  </div>
                  <div>
                    <Button variant="contained" color="primary" type="submit">
                      Add To Cart
                    </Button>
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      // <Card className="entire-shoe">
      //   <CardMedia
      //     className="shoe-media"
      //     component="img"
      //     img={imageUrl}
      //     alt={`${name} image`}
      //     title={`${name} image`}
      //   />

      //   <CardContent className="shoe-details">
      //     <Typography component="h3" variant="h3">
      //       {name}
      //     </Typography>

      //     <Typography variant="subtitle1" color="textSecondary">
      //       Shoe type: {categories[category]}
      //     </Typography>

      //     <Typography variant="subtitle1" color="textSecondary">
      //       Price:{'$' + (price / 100).toFixed(2)}{' '}
      //     </Typography>

      //     <Typography variant="subtitle1"> Product details: </Typography>

      //     <Typography variant="body1" color="textSecondary">
      //       {description}
      //     </Typography>
      //   </CardContent>

      //   <div id="buy-container">
      //     <form
      //       className="purchase-area"
      //       noValidate
      //       autoComplete="off"
      //       onSubmit={this.handleSubmit}
      //     >
      //       <TextField
      //         select
      //         name="size"
      //         onChange={this.handleChange}
      //         value={this.state.size}
      //         helperText="Select size"
      //       >
      //         SIZES
      //         <option value="noSize">select size</option>
      //         <option value="6">6</option>
      //         <option value="7">7</option>
      //         <option value="8">8</option>
      //         <option value="9">9</option>
      //         <option value="10">10</option>
      //       </TextField>

      //       <TextField
      //         select
      //         name="quantity"
      //         onChange={this.handleChange}
      //         value={this.state.quantity}
      //       >
      //         <Typography variant="h5" gutterBottom>
      //           {this.state.quantity}
      //         </Typography>
      //       </TextField>

      //       <CardActions>
      //         <IconButton
      //           size="small"
      //           color="primary"
      //           disabled={disabledDecrease}
      //           onClick={this.decrease}
      //         >
      //           <RemoveCircleOutlineRounded />
      //         </IconButton>

      //         <Typography variant="body1" color="textSecondary">
      //           Quantity: {this.state.quantity}
      //         </Typography>

      //         <IconButton
      //           size="small"
      //           color="primary"
      //           disabled={disabledIncrease}
      //           onClick={this.increase}
      //         >
      //           <AddCircleOutlineRounded />
      //         </IconButton>

      //         <Button
      //           id="add-to-cart"
      //           type="submit"
      //           size="large"
      //           startIcon={<ShoppingCart />}
      //         >
      //           Add to Cart
      //         </Button>
      //       </CardActions>
      //     </form>
      //   </div>
      // </Card>
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
