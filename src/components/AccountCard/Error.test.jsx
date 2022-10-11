import { render } from '@testing-library/react'
import { Base } from './Error.stories'

describe('AccountError', () => {
  test('renders the story', () => {
    const mockOnTryAgain = jest.fn()
    const { container } = render(
      <Base {...Base.args} onTryAgain={mockOnTryAgain} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
