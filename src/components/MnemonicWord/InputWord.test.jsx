import { render } from '@testing-library/react'

import { Base } from './InputWord.stories'

describe('Box', () => {
  test('renders the story', () => {
    const mockSetCorrectWordCount = jest.fn()
    const { container } = render(
      <Base {...Base.args} setCorrectWordCount={mockSetCorrectWordCount} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
