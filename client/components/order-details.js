import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
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
  Button
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {getCurrentOrder} from '../store/order'

const style = {
  table: {maxWidth: 750, minWidth: 600, marginTop: 10},
  paper: {
    marginBottom: 20,
    marginTop: 20,
    maxWidth: 750,
    minWidth: 600,
    padding: 25
  },
  pageHeader: {flex: 1},
  orderDetails: {
    marginTop: 20,
    marginLeft: 15,
    flexDirection: 'column'
  },
  media: {
    width: 100,
    objectFit: 'contain'
  }
}

class OrderDetails extends Component {
  async componentDidMount() {
    await this.props.getOrderDetails(this.props.match.params.orderId)
  }

  render() {
    const {currentOrder} = this.props

    return (
      <Grid container justify="center">
        <Paper style={style.paper} elevation={5}>
          {currentOrder.orderItems ? (
            <Fragment>
              <Toolbar>
                <Typography variant="h6" style={style.pageHeader}>
                  Order #{currentOrder.id} Details
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.history.push('/orders')
                  }}
                >
                  Back To All Orders
                </Button>
              </Toolbar>
              <Divider variant="middle" />
              <Grid container style={style.orderDetails}>
                <Typography variant="body2">
                  Shipping Address: {currentOrder.address}
                </Typography>
                <Typography variant="body2">
                  Order Total: ${(currentOrder.total / 100).toFixed(2)}
                </Typography>
              </Grid>
              <Table style={style.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell />
                    <TableCell>Item Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentOrder.orderItems.map(orderItem => {
                    return (
                      <TableRow key={orderItem.id}>
                        <TableCell>
                          <img
                            src={orderItem.shoe.imageUrl}
                            style={style.media}
                          />
                        </TableCell>
                        <TableCell>
                          <Link to={`/all-shoes/${orderItem.shoe.id}`}>
                            {orderItem.shoe.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          ${(orderItem.shoe.price / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>{orderItem.quantity}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Fragment>
          ) : (
            <div>
              <h3>You don't have any previous orders!</h3>
            </div>
          )}
        </Paper>
      </Grid>
    )
  }
}

const mapState = state => ({
  currentOrder: state.order.current
})

const mapDispatch = dispatch => ({
  getOrderDetails: orderId => dispatch(getCurrentOrder(orderId))
})

export default connect(mapState, mapDispatch)(OrderDetails)
