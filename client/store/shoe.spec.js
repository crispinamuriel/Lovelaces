// [This is the test that Josie made]
//
// import { expect } from 'chai'
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import configureMockStore from 'redux-mock-store';
// import thunkMiddleware from 'redux-thunk';
// const middlewares = [thunkMiddleware];
// const mockStore = configureMockStore(middlewares);
// const initialState = {
//   all: [],
//   current: {}
// };
// import {gotShoes, gotCurrentShoe} from '../store/shoe'
// const store = mockStore(initialState);

// describe('Action creators for Shoes', () => {
//   describe('gotShoes', () => {
//     it('returns properly formmatted action', () => {
//       const shoes = [{id: 2, name: 'Shoe', category: 2, description: 'Nice Shoes', price: 1300}, {id: 3, name: 'FlipFlop', category: 3, description: 'Nice flipflops', price: 2000}, {id: 4, name: 'Heels', category: 4, description: 'Nice heels', price: 5000}]

//       expect(gotShoes(shoes)).to.be.equal({
//         type: 'GOT_SHOES',
//         shoes: shoes
//       })
//     })
//   })

// })

/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getShoes, getCurrentShoe} from '../store/shoe'
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

  describe('getShoes', () => {
    it('eventually dispatches the GOT_SHOES action', async () => {
      const fakeAllShoes = [{categoryId: 21}]
      const categoryId = 1
      mockAxios
        .onGet(`api/shoes/category/${categoryId}`)
        .replyOnce(200, fakeAllShoes)
      await store.dispatch(getShoes(categoryId))
      const actions = store.getActions()
      console.log(actions)
      expect(actions[0].type).to.be.equal('GOT_SHOES')
    })
  })

  describe('getCurrentShoe', () => {
    it('getCurrentShoe: eventually dispatches the GOT_CURRENT_SHOE action', async () => {
      const fakeCurrentShoe = [{id: 1, shoeId: 1}]
      const shoeId = 1
      mockAxios.onGet(`/api/shoes/${shoeId}`).replyOnce(200, fakeCurrentShoe)
      await store.dispatch(getCurrentShoe(shoeId))
      const actions = store.getActions()
      console.log(actions)
      expect(actions[0].type).to.be.equal('GOT_CURRENT_SHOE')
    })
  })
})
