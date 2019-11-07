import axios from 'axios'

// ACTION TYPES
const GOT_USER_CART = 'GOT_USER_CART'
const ADDED_TO_USER_CART = 'ADDED_TO_USER_CART'
const REMOVED_FROM_USER_CART = 'REMOVED_FROM_USER_CART'

const GOT_GUEST_CART = 'GOT_GUEST_CART'
const ADDED_TO_GUEST_CART = 'ADDED_TO_GUEST_CART'
const REMOVED_FROM_GUEST_CART = 'REMOVED_FROM_GUEST_CART'

// INITIAL STATE
const initialState = {
  previousOrders: [],
  cart: {}
}

// ACTION CREATORS
const gotUserCart = cart => ({type: GOT_USER_CART, cart})
const addedToUserCart = cart => ({type: ADDED_TO_USER_CART, cart})
const removedFromUserCart = cart => ({type: REMOVED_FROM_USER_CART, cart})

const gotGuestCart = cart => ({type: GOT_USER_CART, cart})
const addedToGuestCart = cart => ({type: ADDED_TO_USER_CART, cart})
const removedFromGuestCart = cart => ({type: REMOVED_FROM_USER_CART, cart})

// THUNK CREATORS
export const getUserCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/user-cart/${userId}`)
    dispatch(gotUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const addToUserCart = (userId, quantity, shoeId) => async dispatch => {
  try {
    const object = {quantity, shoeId}
    const {data} = await axios.post(`/api/orders/user-cart/${userId}`, object)
    dispatch(addedToUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeFromUserCart = (userId, shoeId) => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/orders/user-cart/${userId}`, {
      shoeId
    })
    dispatch(removedFromUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const getGuestCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/guest-cart`)
    dispatch(gotGuestCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const addToGuestCart = (quantity, shoeId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/guest-cart`, {
      quantity,
      shoeId
    })

    dispatch(addedToGuestCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeFromGuestCart = shoeId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/orders/guest-cart`, {
      shoeId
    })
    dispatch(removedFromGuestCart(data))
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
