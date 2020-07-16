import React from 'react'
import {
  mount,
  shallow
} from 'enzyme'

import Game from '..'

describe('Game page', () => {
  const defaultProps = {}

  it('should render', () => {
    const rendered = mount(<Game {...defaultProps} />)
    expect(rendered).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(shallow(<Game {...defaultProps} />)).toMatchSnapshot()
  })
})
