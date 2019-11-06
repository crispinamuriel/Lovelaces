import axios from 'axios'

// ACTION TYPES
const ADDED_TO_CART = 'ADDED_TO_CART'

// INITIAL STATE
const initialState = {
  all: []
}

// ACTION CREATORS
const addedToCart = cartItem => ({type: ADDED_TO_CART, cartItem})

// THUNK CREATORS
export const addToCart = (userId, cartItem) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${userId}`, cartItem)
    dispatch(gotShoes(data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
