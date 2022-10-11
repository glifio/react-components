import { render } from '@testing-library/react'
import { TestEnvironment } from '../../test-utils/TestEnvironment'

import { ErrorBoundary } from '.'

const ThrowError = () => {
  throw new Error('Test')
}

describe('ErrorBoundary', () => {
  // silence the thrown error for this test
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  test('it should catch errors and render the error boundary component', () => {
    const { container, getByText } = render(
      <TestEnvironment>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </TestEnvironment>
    )

    expect(getByText(/Glif is currently down/)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
