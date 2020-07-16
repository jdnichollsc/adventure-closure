import React from 'react'
import {
  mount,
  shallow
} from 'enzyme'

import Ranking from '..'

describe('Ranking page', () => {
  const defaultProps = {}

  it('should render', () => {
    const rendered = mount(<Ranking {...defaultProps} />)
    expect(rendered).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(shallow(<Ranking {...defaultProps} />)).toMatchSnapshot()
  })
})
