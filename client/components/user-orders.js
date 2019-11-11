import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const UserOrders = () => {
  return (
    <div>
      <h3>Order History</h3>
      <Link to="/home">
        <p>← Back to Account Overview</p>
      </Link>
    </div>
  )
}

const mapState = state => ({
  previousOrders: state.order.previousOrders
})

const mapDispatch = dispatch => ({
  getPreviousOrders: () => dispatch()
})

export default connect(mapState, mapDispatch)(UserOrders)
