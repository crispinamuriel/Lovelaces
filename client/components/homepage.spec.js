/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Homepage from './homepage'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Homepage', () => {
  let homepage

  beforeEach(() => {
    homepage = shallow(<Homepage />)
  })

  it('renders a div with no text', () => {
    expect(homepage.find('div').text()).to.be.equal('')
  })
})
