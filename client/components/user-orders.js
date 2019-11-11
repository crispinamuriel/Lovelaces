import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPreviousOrders} from '../store/order'
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
  Button
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
  pageHeader: {flex: 1}
}

class UserOrders extends Component {
  async componentDidMount() {
    const {getOrders, user} = this.props
    await getOrders(user.id)
  }

  render() {
    const {previousOrders} = this.props

    return (
      <Grid container justify="center">
        <Paper style={style.paper} elevation={5}>
          <Toolbar>
            <Typography variant="h6" style={style.pageHeader}>
              Order History
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.history.push('/home')
              }}
            >
              Back To Account Overview
            </Button>
          </Toolbar>
          <Divider variant="middle" />
          {previousOrders ? (
            <Table style={style.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell>Order Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>View Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previousOrders.map(order => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{order.updatedAt.split('T')[0]}</TableCell>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>${(order.total / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <Link to={`/orders/${order.id}`}>View Details</Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
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
  user: state.user,
  previousOrders: state.order.previousOrders
})

const mapDispatch = dispatch => ({
  getUserInfo: () => dispatch(me()),
  getOrders: userId => dispatch(getPreviousOrders(userId))
})

export default connect(mapState, mapDispatch)(UserOrders)
