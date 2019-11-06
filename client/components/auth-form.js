import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="container">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <Fragment>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />

            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </Fragment>
        )}
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="email" />

        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" />

        <button className="button" type="submit">
          {displayName}
        </button>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div id="customBtn">
        <a href="/auth/google" className="button">
          {displayName} with Google
        </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name

      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(firstName, lastName, email, password, formName))
      } else {
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(null, null, email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
