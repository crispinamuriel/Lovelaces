import {expect} from 'chai'
import {getUserCart} from '../store/order'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    all: [],
    current: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getUserCart', () => {
    it('eventually dispatches the GOT_USER_CART action', async () => {
      const fakeCart = [{userId: 21}]
      const userId = 1
      mockAxios.onGet(`api/orders/user-cart/${userId}`).replyOnce(200, fakeCart)
      await store.dispatch(getUserCart(userId))
      const actions = store.getActions()
      console.log(actions)
      expect(actions[0].type).to.be.equal('GOT_USER_CART')
    })
  })
})
