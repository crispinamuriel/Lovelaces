import React from 'react'
import {Link} from 'react-router-dom'

const UserProfile = () => {
  return (
    <div>
      <h3>Edit Account</h3>
      <Link to="/home">
        <p>← Back to Account Overview</p>
      </Link>
    </div>
  )
}

export default UserProfile
