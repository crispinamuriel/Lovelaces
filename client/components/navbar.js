import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 id="header">LoveLaces</h1>
    <nav id="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <Link to="/all-shoes">All Shoes</Link>
          <Link to="/sneakers">Sneakers</Link>
          <Link to="/boots-booties">Boots & Booties</Link>
          <Link to="/flipflops">Flip Flops</Link>
          <Link to="/heels">Heels</Link>
          <Link to="/flats">Flats</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/all-shoes">All Shoes</Link>
          <Link to="/sneakers">Sneakers</Link>
          <Link to="/boots-booties">Boots & Booties</Link>
          <Link to="/flipflops">Flip Flops</Link>
          <Link to="/heels">Heels</Link>
          <Link to="/flats">Flats</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
