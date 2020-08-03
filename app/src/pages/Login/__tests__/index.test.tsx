import React from 'react'
import {
  mount,
  shallow
} from 'enzyme'

import Login from '..'

describe('Login page', () => {
  const defaultProps = {}

  it('should render', () => {
    const rendered = mount(<Login {...defaultProps} />)
    expect(rendered).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(shallow(<Login {...defaultProps} />)).toMatchSnapshot()
  })
})
