import { render } from '@testing-library/react'
import { Base } from './index.stories'

describe('Stepper', () => {
  test('renders the story', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
