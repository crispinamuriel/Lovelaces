/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Shoe from './shoe'
import store from '../store/index'
const adapter = new Adapter()
enzyme.configure({adapter})

describe('Shoe', () => {
  let shoe

  beforeEach(() => {
    shoe = shallow(<Shoe current={{name: 'Schutz Chayanne'}} store={store} />)
  })

  it('renders the name in an h3', () => {
    expect(shoe.find('h3').text()).to.be.equal('Schutz Chayanne')
  })
})
