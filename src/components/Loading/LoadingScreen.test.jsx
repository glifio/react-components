import { render } from '@testing-library/react'
import { LoadingScreen } from './LoadingScreen'

describe('LoadingScreen', () => {
  test('renders correctly', () => {
    const { container } = render(<LoadingScreen />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
