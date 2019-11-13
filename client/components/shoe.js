import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCurrentShoe} from '../store/shoe'
import {addToUserCart} from '../store/order'
import {
  Button,
  Breadcrumbs,
  Typography,
  TextField,
  Grid,
  Paper,
  Toolbar,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  HomeIcon
} from '@material-ui/core'

const style = {
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
  breadCrumb: {
    border: 0,
    borderRadius: 3,
    margin: 20
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
    const categories = {
      1: 'Sneakers',
      2: 'Boots & Booties',
      3: 'Flip-Flops',
      4: 'Heels',
      5: 'Flats'
    }

    const categoryPaths = {
      1: '/sneakers',
      2: '/boots-booties',
      3: '/flipflops',
      4: '/heels',
      5: '/flats'
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
          <Breadcrumbs
            separator=">"
            icon={<HomeIcon fontSize="small" />}
            style={style.inputLabel}
          >
            <Link to="/" color="inherit">
              Homepage
            </Link>
            <Link to="/all-shoes" color="inherit">
              All Shoes
            </Link>
            <Link
              color="inherit"
              href="/"
              onClick={() => {
                this.props.history.push(`${categoryPaths[category]}`)
              }}
            >
              {categories[category]}
            </Link>
          </Breadcrumbs>

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
    )
  }
}

const mapStateToProps = state => {
  return {
    current: state.shoe.current,
    user: state.user,
    cart: state.order.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentShoe: id => dispatch(getCurrentShoe(id)),
    addToUserCart: (userId, quantity, shoeId) =>
      dispatch(addToUserCart(userId, quantity, shoeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoe)
