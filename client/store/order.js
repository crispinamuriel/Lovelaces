import axios from 'axios'

// ACTION TYPES
const GOT_USER_CART = 'GOT_USER_CART'
const ADDED_TO_USER_CART = 'ADDED_TO_USER_CART'
const REMOVED_FROM_USER_CART = 'REMOVED_FROM_USER_CART'

// INITIAL STATE
const defaultCart = {}

// ACTION CREATORS
const gotUserCart = cart => ({type: GOT_USER_CART, cart})
const addedToUserCart = cart => ({type: ADDED_TO_USER_CART, cart})
const removedFromUserCart = cart => ({type: REMOVED_FROM_USER_CART, cart})

// THUNK CREATORS
export const getCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/user-cart/${userId}`)
    dispatch(gotUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const addToCart = (userId, quantity, shoeId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/user-cart/${userId}`, {
      quantity,
      shoeId
    })

    dispatch(addedToUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeFromCart = (userId, shoeId) => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/orders/user-cart/${userId}`, {
      shoeId
    })
    dispatch(removedFromUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_USER_CART:
      return action.cart
    case ADDED_TO_USER_CART:
      return action.cart
    case REMOVED_FROM_USER_CART:
      return action.cart
    default:
      return state
  }
}
