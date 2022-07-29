import { render } from '@testing-library/react'
import { LoadingIcon } from './LoadingIcon'

describe('LoadingIcon', () => {
  test('renders correctly', () => {
    const { container } = render(<LoadingIcon />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
