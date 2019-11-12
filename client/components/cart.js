/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromUserCart, getUserCart} from '../store/order'
import {me} from '../store'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Divider,
  Button,
  Avatar
} from '@material-ui/core'

const style = {
  table: {maxWidth: 750, minWidth: 600, marginTop: 20},
  paper: {
    marginBottom: 20,
    marginTop: 20,
    maxWidth: 750,
    minWidth: 600,
    padding: 25
  },
  media: {width: 100, objectFit: 'contain'},
  pageHeader: {flex: 1}
}

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    // bring the order info, w/ thunk from mapDispatch
    await this.props.getUserInfo()

    if (this.props.user.id) {
      await this.props.getUserCart(this.props.user.id)
    } else {
      await this.props.getUserCart(null)
    }
  }

  render() {
    const {cart, remove, user} = this.props

    if (cart === null) {
      return (
        <div>
          <h3>There's nothing in your cart right now</h3>
        </div>
      )
    }

    console.log('SHOW ME THE USER', user)
    console.log('SHOW ME CART TOTAL', cart.total)
    console.log('SHOW ME THE ORDER ITEMS', cart.orderItems)
    return (
      <Grid container justify="center">
        <Paper style={style.paper} elevation={5}>
          <Toolbar>
            {user.firstName ? (
              <Typography variant="h6" style={style.pageHeader}>
                {user.firstName}'s Cart
              </Typography>
            ) : (
              <Typography variant="h6" style={style.pageHeader}>
                Cart{' '}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.history.push('/all-shoes')
              }}
            >
              Continue Shopping
            </Button>
          </Toolbar>
          <Divider variant="middle" />

          {cart.orderItems.length ? (
            <Table style={style.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>Item Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.orderItems.map(orderItem => {
                  const shoe = orderItem.shoe
                  return (
                    <TableRow key={shoe.id}>
                      <TableCell alight="right">
                        <Link to={`/all-shoes/${shoe.id}`}>
                          {' '}
                          <img src={shoe.imageUrl} style={style.media} />
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/all-shoes/${shoe.id}`}> {shoe.name} </Link>
                      </TableCell>

                      <TableCell>${(shoe.price / 100).toFixed(2)}</TableCell>

                      <TableCell>{orderItem.quantity}</TableCell>

                      <TableCell> </TableCell>

                      <TableCell>
                        {' '}
                        <button
                          onClick={() => {
                            remove(user.id, orderItem.shoeId)
                          }}
                        >
                          {' '}
                          Remove{' '}
                        </button>{' '}
                      </TableCell>
                    </TableRow>
                  )
                })}

                <TableRow>
                  <TableCell colSpan={2}>
                    {' '}
                    Total Price: ${(cart.total / 100).toFixed(2)}{' '}
                  </TableCell>
                  <TableCell align="right">
                    <Link to="/checkout/">
                      <button>Checkout</button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div>
              <h3>There's nothing in your cart right now</h3>
            </div>
          )}
        </Paper>
      </Grid>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.order.cart
})

const mapDispatch = dispatch => ({
  remove: (userId, shoeId) => dispatch(removeFromUserCart(userId, shoeId)),
  getUserCart: userId => dispatch(getUserCart(userId)),
  getUserInfo: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
