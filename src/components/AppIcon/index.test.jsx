import { render } from '@testing-library/react'
import AppIcon from './index'

describe('AppIcon', () => {
  test('renders the AppIcon', () => {
    const { container } = render(<AppIcon />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
