import axios from 'axios'

// ACTION TYPES
const GOT_SHOES = 'GOT_SHOES'
const GOT_CURRENT_SHOE = 'GOT_CURRENT_SHOE'
// INITIAL STATE
const initialState = {
  all: [],
  current: {}
}

// ACTION CREATORS
const gotShoes = shoes => ({type: GOT_SHOES, shoes})
const gotCurrentShoe = currentShoe => ({type: GOT_CURRENT_SHOE, currentShoe})

// THUNK CREATORS
export const getShoes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/shoes')
    dispatch(gotShoes(data))
  } catch (err) {
    console.log(err)
  }
}

export const getCurrentShoe = shoeId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/shoes/${shoeId}`)
    dispatch(gotCurrentShoe(data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_SHOES:
      return {...state, all: action.shoes}
    case GOT_CURRENT_SHOE:
      return {...state, current: action.currentShoe}
    default:
      return state
  }
}
