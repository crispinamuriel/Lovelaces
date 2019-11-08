import axios from 'axios'

// ACTION TYPES
const GOT_USER_CART = 'GOT_USER_CART'
const ADDED_TO_USER_CART = 'ADDED_TO_USER_CART'
const REMOVED_FROM_USER_CART = 'REMOVED_FROM_USER_CART'

// INITIAL STATE
const initialState = {
  previousOrders: [],

  cart: {
    orderItems: []
  }

  cart: {}

}

// ACTION CREATORS
const gotUserCart = cart => ({type: GOT_USER_CART, cart})
const addedToUserCart = cart => ({type: ADDED_TO_USER_CART, cart})
const removedFromUserCart = cart => ({type: REMOVED_FROM_USER_CART, cart})

// THUNK CREATORS
export const getUserCart = userId => async dispatch => {
  try {
    const {data} =
      typeof userId === 'number'
        ? await axios.get(`/api/orders/user-cart/${userId}`)
        : await axios.get(`/api/orders/guest-cart/`)
    dispatch(gotUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const addToUserCart = (userId, quantity, shoeId) => async dispatch => {
  try {
    const {data} = userId
      ? await axios.post(`/api/orders/user-cart/${userId}`, {
          quantity,
          shoeId
        })
      : await axios.post(`/api/orders/guest-cart`, {
          quantity,
          shoeId
        })

    dispatch(addedToUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeFromUserCart = (userId, shoeId) => async dispatch => {
  try {
    const {data} = userId
      ? await axios.delete(`/api/orders/user-cart/${userId}`, {
          shoeId
        })
      : await axios.delete(`/api/orders/guest-cart`, {
          shoeId
        })
    dispatch(removedFromUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER_CART:
      return {...state, cart: action.cart}
    case ADDED_TO_USER_CART:
      return {...state, cart: action.cart}
    case REMOVED_FROM_USER_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
