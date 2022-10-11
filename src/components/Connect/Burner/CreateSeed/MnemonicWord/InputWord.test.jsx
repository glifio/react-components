import { render } from '@testing-library/react'
import { Base } from './InputWord.stories'

describe('InputWord', () => {
  test('renders the story', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
