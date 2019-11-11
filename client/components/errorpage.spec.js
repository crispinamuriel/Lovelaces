import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Errorpage from './errorpage'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Errorpage', () => {
  let errorpage

  beforeEach(() => {
    errorpage = shallow(<Errorpage />)
  })

  it('renders a div with 404 text', () => {
    expect(errorpage.find('div').text()).to.be.equal('404 Page Not Found')
  })
})
