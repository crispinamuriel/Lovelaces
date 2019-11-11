/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Shoe} from '../shoe'

const adapter = new Adapter()
enzyme.configure({adapter})
const current = {name: 'Schutz Chayanne'}
describe('Shoe', () => {
  let shoe

  beforeEach(() => {
    shoe = shallow(<Shoe current={current} />)
  })

  it('renders the name in an h3', () => {
    expect(shoe.find('h3').text()).to.be.equal('Schutz Chayanne')
  })
})
