import { render } from '@testing-library/react'
import { Base } from './index.stories'

describe('AbiSelector', () => {
  test('renders the story', () => {
    const mockOnSend = jest.fn()
    const { container } = render(<Base {...Base.args} onSend={mockOnSend} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
