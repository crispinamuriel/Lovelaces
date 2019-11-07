import axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'

// INITIAL STATE
const defaultCart = {}

// ACTION CREATORS
const gotCart = cart => ({type: GOT_CART, cart})
const addedToCart = cart => ({type: ADDED_TO_CART, cart})
const removedFromCart = cart => ({type: REMOVED_FROM_CART, cart})

// THUNK CREATORS
export const getCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/user-cart/${userId}`)
    dispatch(gotCart(data))
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

    dispatch(addedToCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeFromCart = (userId, shoeId) => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/orders/user-cart/${userId}`, {
      shoeId
    })
    dispatch(removedFromCart(data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADDED_TO_CART:
      return action.cart
    case REMOVED_FROM_CART:
      return action.cart
    default:
      return state
  }
}
