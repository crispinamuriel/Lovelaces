/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome variant="h6" />)
  })

  it('renders a grid', () => {
    expect(typeof userHome.find('h6')).to.be.equal('object')
  })
})
