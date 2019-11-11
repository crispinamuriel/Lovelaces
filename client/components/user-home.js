import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props

  return (
    <div>
      <h3>Welcome back, {name}!</h3>
      <Link to="/profile">
        <h4>My Details</h4>
      </Link>
      <Link to="/orders">
        <h4>My Orders</h4>
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.firstName
  }
}

export default connect(mapState)(UserHome)
