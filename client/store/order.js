import axios from 'axios'

// ACTION TYPES
const GOT_USER_CART = 'GOT_USER_CART'
const ADDED_TO_USER_CART = 'ADDED_TO_USER_CART'
const REMOVED_FROM_USER_CART = 'REMOVED_FROM_USER_CART'
const UPDATED_QUANTITY_IN_CART = 'UPDATED_QUANTITY_IN_CART'
const PLACED_ORDER = 'PLACED_ORDER'
const GOT_PREVIOUS_ORDERS = 'GOT_PREVIOUS_ORDERS'
const GOT_CURRENT_ORDER = 'GOT_CURRENT_ORDER'

// INITIAL STATE
const initialState = {
  previousOrders: [],
  current: {},
  cart: {
    orderItems: []
  }
}

// ACTION CREATORS
const gotUserCart = cart => ({type: GOT_USER_CART, cart})
const addedToUserCart = cart => ({type: ADDED_TO_USER_CART, cart})
const removedFromUserCart = cart => ({type: REMOVED_FROM_USER_CART, cart})
const updatedQuantityInCart = cart => ({type: UPDATED_QUANTITY_IN_CART, cart})
const placedOrder = cart => ({type: PLACED_ORDER, cart})
const gotPreviousOrders = previousOrders => ({
  type: GOT_PREVIOUS_ORDERS,
  previousOrders
})
const gotCurrentOrder = order => ({type: GOT_CURRENT_ORDER, order})

// THUNK CREATORS
export const getUserCart = userId => async dispatch => {
  try {
    const {data} = userId
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
          data: {shoeId}
        })
      : await axios.delete(`/api/orders/guest-cart`, {
          data: {shoeId}
        })
    dispatch(removedFromUserCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateQuantityInCart = (
  quantity,
  orderId,
  shoeId
) => async dispatch => {
  try {
    const {data} = await axios.patch('/api/orders/user-cart/edit-quantity', {
      quantity,
      orderId,
      shoeId
    })
    dispatch(updatedQuantityInCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const placeOrder = (userId, address) => async dispatch => {
  try {
    const {data} = userId
      ? await axios.patch(`/api/orders/user-cart/checkout/${userId}`, {address})
      : await axios.patch(`/api/orders/guest-cart/`, {address})
    dispatch(placedOrder(data))
  } catch (err) {
    console.log(err)
  }
}

export const getPreviousOrders = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/user-orders/${userId}`)
    dispatch(gotPreviousOrders(data))
  } catch (err) {
    console.log(err)
  }
}

export const getCurrentOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(gotCurrentOrder(data))
  } catch (err) {
    next(err)
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
    case UPDATED_QUANTITY_IN_CART:
      return {...state, cart: action.cart}
    case PLACED_ORDER:
      return {...state, cart: action.cart}
    case GOT_PREVIOUS_ORDERS:
      return {...state, previousOrders: action.previousOrders}
    case GOT_CURRENT_ORDER: {
      return {...state, current: action.order}
    }
    default:
      return state
  }
}
